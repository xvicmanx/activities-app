## Modules

<dl>
<dt><a href="#module_helpers">helpers</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Controller">Controller</a></dt>
<dd><p>All the controllers extend from this class</p>
</dd>
<dt><a href="#PictureUploader">PictureUploader</a></dt>
<dd></dd>
</dl>

<a name="module_helpers"></a>

## helpers

* [helpers](#module_helpers)
    * [~getLoggedInUser](#module_helpers..getLoggedInUser) ⇒ <code>User</code>
    * [~authRequired](#module_helpers..authRequired)
    * [~invalidParamError](#module_helpers..invalidParamError)
    * [~asObject](#module_helpers..asObject) ⇒ <code>Object</code>
    * [~ValidationError](#module_helpers..ValidationError)
    * [~NotFoundError](#module_helpers..NotFoundError)
    * [~throwValidationError](#module_helpers..throwValidationError)
    * [~throwNotFoundError](#module_helpers..throwNotFoundError)
    * [~errorHandler](#module_helpers..errorHandler)

<a name="module_helpers..getLoggedInUser"></a>

### helpers~getLoggedInUser ⇒ <code>User</code>
Gets the logged in user using the JWT token

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
**Returns**: <code>User</code> - logged in user  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>$Response</code> | Express response |

<a name="module_helpers..authRequired"></a>

### helpers~authRequired
Wrapper to make a request auth dependant.
If the user is not signed in it will throw 401 error

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | function to wrap |

<a name="module_helpers..invalidParamError"></a>

### helpers~invalidParamError
Throw a invalid param error with a 400 status

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>$Request</code> | Express request |
| res | <code>$Response</code> | Express response |
| message | <code>string</code> | message of the error |

<a name="module_helpers..asObject"></a>

### helpers~asObject ⇒ <code>Object</code>
Transforms a target to object in case of not being

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
**Returns**: <code>Object</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>mixed</code> | target item |

<a name="module_helpers..ValidationError"></a>

### helpers~ValidationError
Errors related to Validation

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
<a name="module_helpers..NotFoundError"></a>

### helpers~NotFoundError
Errors related to not found objects

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
<a name="module_helpers..throwValidationError"></a>

### helpers~throwValidationError
Throws a validation error

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
**Throws**:

- <code>ValidationError</code> 


| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | param name |
| extraMessage | <code>string</code> | additional message |

<a name="module_helpers..throwNotFoundError"></a>

### helpers~throwNotFoundError
Throws a validation error

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  
**Throws**:

- <code>NotFoundError</code> 


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | error message |

<a name="module_helpers..errorHandler"></a>

### helpers~errorHandler
Handles error returning the correct status

**Kind**: inner property of [<code>helpers</code>](#module_helpers)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Funtion to handle errors |

<a name="Controller"></a>

## Controller
All the controllers extend from this class

**Kind**: global class  
<a name="PictureUploader"></a>

## PictureUploader
**Kind**: global class  
<a name="new_PictureUploader_new"></a>

### new PictureUploader()
Helper class to upload pictures

