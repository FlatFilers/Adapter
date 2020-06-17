[flatfile-csv-importer](README.md) › [Globals](globals.md)

# flatfile-csv-importer

## Index

### Classes

* [FlatfileImporter](classes/flatfileimporter.md)

### Type aliases

* [FieldHookCallback](globals.md#fieldhookcallback)
* [Scalar](globals.md#scalar)

## Type aliases

###  FieldHookCallback

Ƭ **FieldHookCallback**: *function*

*Defined in [src/index.ts:345](https://github.com/FlatFilers/Adapter/blob/a601586/src/index.ts#L345)*

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

*Defined in [src/index.ts:343](https://github.com/FlatFilers/Adapter/blob/a601586/src/index.ts#L343)*
