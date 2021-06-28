/**
 * Custom naming for fk, pk, index etc. database
 */
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce(
      (name, columnName) => `${name.split('.').join('_')}_${columnName}`,
      `${tableOrName}_${referencedTablePath}`,
    );
    return `fk_${name}`;
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    return `pk_${tableOrName.split('.').join('_')}`;
  }

  indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const name = columnNames.reduce(
      (name, columnName) => `${name.split('.').join('_')}_${columnName}`,
      `${tableOrName}`,
    );
    return `IDX_${name}`;
  }
}
