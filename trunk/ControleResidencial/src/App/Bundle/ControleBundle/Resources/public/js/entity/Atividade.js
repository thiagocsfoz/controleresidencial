
~~~~~~~~~~~~~~~~~~

New headers can be added to the HeaderSet by using one of the provided
``add..Header()`` methods.

To add a header to a MIME entity (such as the message):

Get the HeaderSet from the entity by via its ``getHeaders()`` method.

* Add the header to the HeaderSet by calling one of the ``add..Header()``
  methods.

The added header will appear in the message when it is sent.

.. code-block:: php

    // Adding a custom header to a message
    $message = Swift_Message::newInstance();
    $headers = $message->getHeaders();
    $headers->addTextHeader('X-Mine', 'something here');

    // Adding a custom header to an attachment
    $attachment = Swift_Attachment::fromPath('/path/to/doc.pdf');
    $attachment->getHeaders()->addDateHeader('X-Created-Time', time());

Retrieving Headers
~~~~~~~~~~~~~~~~~~

Headers are retrieved through the HeaderSet's ``get()`` and ``getAll()``
methods.

To get a header, or several headers from a MIME entity:

* Get the HeaderSet from the entity by via its ``getHeaders()`` method.

* Get the header(s) from the HeaderSet by calling either ``get()`` or
  ``getAll()``.

When using ``get()`` a single header is returned that matches the name (case
insensitive) that is passed to it. When using ``getAll()`` with a header name,
an array of headers with that name are returned. Calling ``getAll()`` with no
arguments returns an array of all headers present in the entity.

.. note::

    It's valid for some headers to appear more than once in a message (e.g.
    the Received header). For this reason ``getAll()`` exists to fetch all
    headers with a specified name. In addition, ``get()`` accepts an optional
    numerical index, starting from zero to specify which header you want more
    specifically.

.. note::

 