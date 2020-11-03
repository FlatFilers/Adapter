[@flatfile/adapter](README.md) › [Globals](globals.md)

# @flatfile/adapter

## Index

### Classes

* [FlatfileImporter](classes/flatfileimporter.md)

### Type aliases

* [FieldHookCallback](globals.md#fieldhookcallback)
* [Scalar](globals.md#scalar)

## Type aliases

###  FieldHookCallback

Ƭ **FieldHookCallback**: *function*

*Defined in [src/index.ts:357](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L357)*

#### Type declaration:

▸ (`values`: [[Scalar](globals.md#scalar), number][], `meta`: any): *[IDataHookRecord, number][] | Promise‹[IDataHookRecord, number][]›*

**Parameters:**

Name | Type |
------ | ------ |
`values` | [[Scalar](globals.md#scalar), number][] |
`meta` | any |

___

###  Scalar

Ƭ **Scalar**: *string | number | boolean | null | undefined*

*Defined in [src/index.ts:355](https://github.com/FlatFilers/Adapter/blob/06b4ab7/src/index.ts#L355)*
