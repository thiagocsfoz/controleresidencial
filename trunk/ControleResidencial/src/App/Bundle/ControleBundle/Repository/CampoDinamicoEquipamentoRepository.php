<?php

/*
 * This file is part of SwiftMailer.
 * (c) 2004-2009 Chris Corbyn
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A MIME entity, in a multipart message.
 *
 * @package    Swift
 * @subpackage Mime
 * @author     Chris Corbyn
 */
class Swift_Mime_SimpleMimeEntity implements Swift_Mime_MimeEntity
{
    /** A collection of Headers for this mime entity */
    private $_headers;

    /** The body as a string, or a stream */
    private $_body;

    /** The encoder that encodes the body into a streamable format */
    private $_encoder;

    /** The grammar to use for id validation */
    private $_grammar;

    /** A mime boundary, if any is used */
    private $_boundary;

    /** Mime types to be used based on the nesting level */
    private $_compositeRanges = array(
        'multipart/mixed' => array(self::LEVEL_TOP, self::LEVEL_MIXED),
        'multipart/alternative' => array(self::LEVEL_MIXED, self::LEVEL_ALTERNATIVE),
        'multipart/related' => array(self::LEVEL_ALTERNATIVE, self::LEVEL_RELATED)
    );

    /** A set of filter rules to define what level an entity should be nested at */
    private $_compoundLevelFilters = array();

    /** The nesting level of this entity */
    private $_nestingLevel = self::LEVEL_ALTERNATIVE;

    /** A KeyCache instance used during encoding and streaming */
    private $_cache;

    /** Direct descendants of this entity */
    private $_immediateChildren = array();

    /** All descendants of this entity */
    private $_children = array();

    /** The maximum line length of the body of this entity */
    private $_maxLineLength = 78;

    /** The order in which alternative mime types should appear */
    private $_alternativePartOrder = array(
        'text/plain' => 1,
        'text/html' => 2,
        'multipart/related' => 3
    );

    /** The CID of this entity */
    private $_id;

    /** The key used for accessing the cache */
    private $_cacheKey;

    protected $_userContentType;

    /**
     * Create a new SimpleMimeEntity with $headers, $encoder and $cache.
     *
     * @param Swift_Mime_HeaderSet      $headers
     * @param Swift_Mime_ContentEncoder $encoder
     * @param Swift_KeyCache            $cache
     * @param Swift_Mime_Grammar        $grammar
     */
    public function __construct(Swift_Mime_HeaderSet $headers, Swift_Mime_ContentEncoder $encoder, Swift_KeyCache $cache, Swift_Mime_Grammar $grammar)
    {
        $this->_cacheKey = md5(uniqid(getmypid().mt_rand(), true));
        $this->_cache = $cache;
        $this->_headers = $headers;
        $this->_grammar = $grammar;
        $this->setEncoder($encoder);
        $this->_headers->defineOrdering(array('Content-Type', 'Content-Transfer-Encoding'));

        // This array specifies that, when the entire MIME document contains
        // $compoundLevel, then for each child within $level, if its 