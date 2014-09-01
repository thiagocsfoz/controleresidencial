e()`` accepts an optional
    numerical index, starting from zero to specify which header you want to
    check more specifically. For the same reason, ``removeAll()`` exists to
    remove all headers that have the given name.

    .. code-block:: php

        $headers = $message->getHeaders();

        // Remove the Subject: header
        $headers->remove('Subject');

        // Remove all X-Foo headers
        $headers->removeAll('X-Foo');

        // Remove only the second X-Foo header
        $headers->remove('X-Foo', 1);

Modifying a Header's Content
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To change a Header's content you should know what type of header it is and then
call it's appropriate setter method. All headers also have a
``setFieldBodyModel()`` method that accepts a mixed parameter and delegates to
the correct setter.

To modify an existing header:

* Get the HeaderSet from the entity by via its ``getHeaders()`` method.

* Get the Header by using the HeaderSet's ``get()``.

* Call the Header's appropriate setter method or call the header's
  ``setFieldBodyModel()`` method.

The header will be updated inside the HeaderSet and the changes will be seen
when the message is sent.

.. code-block:: php

    $headers = $message->getHeaders();

    // Change the Subject: header
    $subj = $headers->get('Subject');
    $subj->setValue('new subject here');

    // Change the To: header
    $to = $headers->get('To');
    $to->setNameAddresses(array(
      'person@example.org' => 'Person',
      'thing@example.org'
    ));

    // Using the setFieldBodyModel() just delegates to the correct method
    // So here to calls setNameAddresses()
    $to->setFieldBodyModel(array(
      'person@example.org' => 'Person',
      'thing@example.org'
    ));
                                                                                                                                                                                                                 