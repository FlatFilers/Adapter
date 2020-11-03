[@flatfile/adapter](../README.md) › [Globals](../globals.md) › [FlatfileImporter](flatfileimporter.md)

# Class: FlatfileImporter

## Hierarchy

* EventEmitter

  ↳ **FlatfileImporter**

## Index

### Constructors

* [constructor](flatfileimporter.md#constructor)

### Properties

* [$ready](flatfileimporter.md#ready)
* [Promise](flatfileimporter.md#static-promise)
* [prefixed](flatfileimporter.md#static-prefixed)

### Methods

* [addListener](flatfileimporter.md#addlistener)
* [close](flatfileimporter.md#close)
* [displayError](flatfileimporter.md#displayerror)
* [displayLoader](flatfileimporter.md#displayloader)
* [displaySuccess](flatfileimporter.md#displaysuccess)
* [emit](flatfileimporter.md#emit)
* [eventNames](flatfileimporter.md#eventnames)
* [getMeta](flatfileimporter.md#getmeta)
* [listenerCount](flatfileimporter.md#listenercount)
* [listeners](flatfileimporter.md#listeners)
* [load](flatfileimporter.md#load)
* [off](flatfileimporter.md#off)
* [on](flatfileimporter.md#on)
* [once](flatfileimporter.md#once)
* [open](flatfileimporter.md#open)
* [registerFieldHook](flatfileimporter.md#registerfieldhook)
* [registerNetworkErrorCallback](flatfileimporter.md#registernetworkerrorcallback)
* [registerRecordHook](flatfileimporter.md#registerrecordhook)
* [registerValidatorCallback](flatfileimporter.md#registervalidatorcallback)
* [removeAllListeners](flatfileimporter.md#removealllisteners)
* [removeListener](flatfileimporter.md#removelistener)
* [requestCorrectionsFromUser](flatfileimporter.md#requestcorrectionsfromuser)
* [requestDataFromUser](flatfileimporter.md#requestdatafromuser)
* [setCustomer](flatfileimporter.md#setcustomer)
* [setMountUrl](flatfileimporter.md#static-setmounturl)
* [setVersion](flatfileimporter.md#static-setversion)

## Constructors

###  constructor

\+ **new FlatfileImporter**(`apiKey`: string, `options`: object, `customer?`: CustomerObject): *[FlatfileImporter](flatfileimporter.md)*

*Defined in [src/index.ts:41](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`apiKey` | string |
`options` | object |
`customer?` | CustomerObject |

**Returns:** *[FlatfileImporter](flatfileimporter.md)*

## Properties

###  $ready

• **$ready**: *Promise‹any›*

*Defined in [src/index.ts:26](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L26)*

Promise that resolves when the handshake is completed between Flatfile.io and the adapter

___

### `Static` Promise

▪ **Promise**: *PromiseConstructor* = Promise

*Defined in [src/index.ts:20](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L20)*

___

### `Static` prefixed

▪ **prefixed**: *string | boolean*

*Inherited from [FlatfileImporter](flatfileimporter.md).[prefixed](flatfileimporter.md#static-prefixed)*

Defined in node_modules/eventemitter3/index.d.ts:10

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `fn`: ListenerFn, `context?`: any): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[addListener](flatfileimporter.md#addlistener)*

Defined in node_modules/eventemitter3/index.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`fn` | ListenerFn |
`context?` | any |

**Returns:** *this*

___

###  close

▸ **close**(): *void*

*Defined in [src/index.ts:238](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L238)*

Call close() from the parent window in order to hide the importer. You can do this after
handling the import callback so your users don't have to click the confirmation button

**Returns:** *void*

___

###  displayError

▸ **displayError**(`msg`: string): *void*

*Defined in [src/index.ts:158](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L158)*

This will display a dialog inside of the importer with an error icon and the message you
pass. The user will be able to acknowledge the error and be returned to the import data
spreadsheet to ideally fix any issues or attempt submitting again.

**`deprecated`** 

**Parameters:**

Name | Type |
------ | ------ |
`msg` | string |

**Returns:** *void*

___

###  displayLoader

▸ **displayLoader**(`msg?`: undefined | string): *void*

*Defined in [src/index.ts:146](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L146)*

This will display a progress indicator inside the importer if you anticipate that handling
the output of the importer may take some time.

**Parameters:**

Name | Type |
------ | ------ |
`msg?` | undefined &#124; string |

**Returns:** *void*

___

###  displaySuccess

▸ **displaySuccess**(`msg`: string): *void*

*Defined in [src/index.ts:180](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L180)*

This will display a dialog inside of the importer with a success icon and the message you
pass.

**Parameters:**

Name | Type |
------ | ------ |
`msg` | string |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: Array‹any›): *boolean*

*Inherited from [FlatfileImporter](flatfileimporter.md).[emit](flatfileimporter.md#emit)*

Defined in node_modules/eventemitter3/index.d.ts:31

Calls each of the listeners registered for a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | Array‹any› |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [FlatfileImporter](flatfileimporter.md).[eventNames](flatfileimporter.md#eventnames)*

Defined in node_modules/eventemitter3/index.d.ts:16

Return an array listing the events for which the emitter has registered
listeners.

**Returns:** *Array‹string | symbol›*

___

###  getMeta

▸ **getMeta**(): *object*

*Defined in [src/index.ts:189](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L189)*

This will fetch the data from the importer

**Returns:** *object*

___

###  listenerCount

▸ **listenerCount**(`event`: string | symbol): *number*

*Inherited from [FlatfileImporter](flatfileimporter.md).[listenerCount](flatfileimporter.md#listenercount)*

Defined in node_modules/eventemitter3/index.d.ts:26

Return the number of listeners listening to a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Array‹ListenerFn›*

*Inherited from [FlatfileImporter](flatfileimporter.md).[listeners](flatfileimporter.md#listeners)*

Defined in node_modules/eventemitter3/index.d.ts:21

Return the listeners registered for a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Array‹ListenerFn›*

___

###  load

▸ **load**(): *Promise‹Array‹Object››*

*Defined in [src/index.ts:109](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L109)*

Use load() when you want a promise returned. This is necessary if you want to use
async/await for an es6 implementation

**`deprecated`** 

**Returns:** *Promise‹Array‹Object››*

___

###  off

▸ **off**(`event`: string | symbol, `fn?`: ListenerFn, `context?`: any, `once?`: undefined | false | true): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[off](flatfileimporter.md#off)*

Defined in node_modules/eventemitter3/index.d.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`fn?` | ListenerFn |
`context?` | any |
`once?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `fn`: ListenerFn, `context?`: any): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[on](flatfileimporter.md#on)*

Defined in node_modules/eventemitter3/index.d.ts:36

Add a listener for a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`fn` | ListenerFn |
`context?` | any |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `fn`: ListenerFn, `context?`: any): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[once](flatfileimporter.md#once)*

Defined in node_modules/eventemitter3/index.d.ts:42

Add a one-time listener for a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`fn` | ListenerFn |
`context?` | any |

**Returns:** *this*

___

###  open

▸ **open**(`options`: object): *void*

*Defined in [src/index.ts:87](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L87)*

Call open() to activate the importer overlay dialog.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | object | {} |

**Returns:** *void*

___

###  registerFieldHook

▸ **registerFieldHook**(`field`: string, `cb`: [FieldHookCallback](../globals.md#fieldhookcallback)): *void*

*Defined in [src/index.ts:230](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L230)*

Set the customer information for this import

**Parameters:**

Name | Type |
------ | ------ |
`field` | string |
`cb` | [FieldHookCallback](../globals.md#fieldhookcallback) |

**Returns:** *void*

___

###  registerNetworkErrorCallback

▸ **registerNetworkErrorCallback**(`callback`: FlatfileImporter["$networkErrorCallback"]): *void*

*Defined in [src/index.ts:223](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`callback` | FlatfileImporter["$networkErrorCallback"] |

**Returns:** *void*

___

###  registerRecordHook

▸ **registerRecordHook**(`callback`: FlatfileImporter["$recordHook"]): *void*

*Defined in [src/index.ts:219](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L219)*

Set the customer information for this import

**Parameters:**

Name | Type |
------ | ------ |
`callback` | FlatfileImporter["$recordHook"] |

**Returns:** *void*

___

###  registerValidatorCallback

▸ **registerValidatorCallback**(`callback`: FlatfileImporter["$validatorCallback"]): *void*

*Defined in [src/index.ts:209](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L209)*

Set the customer information for this import

**Parameters:**

Name | Type |
------ | ------ |
`callback` | FlatfileImporter["$validatorCallback"] |

**Returns:** *void*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[removeAllListeners](flatfileimporter.md#removealllisteners)*

Defined in node_modules/eventemitter3/index.d.ts:53

Remove all listeners, or those of the specified event.

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `fn?`: ListenerFn, `context?`: any, `once?`: undefined | false | true): *this*

*Inherited from [FlatfileImporter](flatfileimporter.md).[removeListener](flatfileimporter.md#removelistener)*

Defined in node_modules/eventemitter3/index.d.ts:47

Remove the listeners of a given event.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`fn?` | ListenerFn |
`context?` | any |
`once?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  requestCorrectionsFromUser

▸ **requestCorrectionsFromUser**(`msg`: any): *Promise‹FlatfileResults›*

*Defined in [src/index.ts:169](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L169)*

This will display a dialog inside of the importer with an error icon and the message you
pass. The user will be able to acknowledge the error and be returned to the import data
spreadsheet to ideally fix any issues or attempt submitting again.

**Parameters:**

Name | Type |
------ | ------ |
`msg` | any |

**Returns:** *Promise‹FlatfileResults›*

___

###  requestDataFromUser

▸ **requestDataFromUser**(`options`: LoadOptionsObject): *Promise‹FlatfileResults›*

*Defined in [src/index.ts:137](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L137)*

Use requestDataFromUser() when you want a promise returned. This is necessary if you want to use
async/await for an es6 implementation

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | LoadOptionsObject | {} |

**Returns:** *Promise‹FlatfileResults›*

___

###  setCustomer

▸ **setCustomer**(`customer`: CustomerObject): *void*

*Defined in [src/index.ts:202](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L202)*

Set the customer information for this import

**Parameters:**

Name | Type |
------ | ------ |
`customer` | CustomerObject |

**Returns:** *void*

___

### `Static` setMountUrl

▸ **setMountUrl**(`url`: string): *void*

*Defined in [src/index.ts:64](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L64)*

This will by default always be `https://www.flatfile.io/importer/:key` unless you are
an enterprise customer that is self-hosting the application. In which case, this
will be the URL of your enterprise installd Flatfile importer index page

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *void*

___

### `Static` setVersion

▸ **setVersion**(`version`: 1 | 2): *void*

*Defined in [src/index.ts:71](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L71)*

This allows you to opt into or out of specific versions of the Flatfile SDK

**Parameters:**

Name | Type |
------ | ------ |
`version` | 1 &#124; 2 |

**Returns:** *void*
