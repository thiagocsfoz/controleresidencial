ction getHeaders()
    {
        return $this->_headers;
    }

    /**
     * Get the nesting level of this entity.
     *
     * @see LEVEL_TOP, LEVEL_MIXED, LEVEL_RELATED, LEVEL_ALTERNATIVE
     *
     * @return integer
     */
    public function getNestingLevel()
    {
        return $this->_nestingLevel;
    }

    /**
     * Get the Content-type of this entity.
     *
     * @return string
     */
    public function getContentType()
    {
        return $this->_getHeaderFieldModel('Content-Type');
    }

    /**
     * Set the Content-type of this entity.
     *
     * @param string $type
     *
     * @return Swift_Mime_SimpleMimeEntity
     */
    public function setContentType($type)
    {
        $this->_setContentTypeInHeaders($type);
        // Keep track of the value so that if the content-type changes automatically
        // due to added child entities, it can be restored if they are later removed
        $this->_userContentType = $type;

        return $this;
    }

    /**
     * Get the CID of this entity.
     *
     * The CID will only be present in headers if a Content-ID header is present.
     *
     * @return string
     */
    public function getId()
    {
        return $this->_headers->has($this->_getIdField()) ? current((array) $this->_getHeaderFieldModel($this->_getIdField())) : $this->_id;
    }

    /**
     * Set the CID of this entity.
     *
     * @param string $id
     *
     * @return Swift_Mime_SimpleMimeEntity
     */
    public function setId($id)
    {
        if (!$this->_setHeaderFieldModel($this->_getIdField(), $id)) {
            $this->_headers->addIdHeader($this->_getIdField(), $id);
        }
        $this->_id = $id;

        return $this;
    }

    /**
     * Get the description of this entity.
     *
     * This value comes from the Content-Description header if set.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->_getHeaderFieldModel('Content-Description');
    }

    /**
     * Set the description of this entity.
     *
     * This method sets a value in the Content-ID header.
     *
     * @param string $description
     *
     * @return Swift_Mime_SimpleMimeEntity
     */
    public function setDescription($description)
    {
        if (!$this->_setHeaderFieldModel('Content-Description', $description)) {
            $this->_headers->addTextHeader('Content-Description', $description);
        }

        return $this;
    }

    /**
     * Get the maximum line length of the body of this entity.
     