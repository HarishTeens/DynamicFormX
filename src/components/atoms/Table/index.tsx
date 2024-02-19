import { useMemo } from 'react';

import { ITableProps, ITableRowFilled } from './types';
import {
  getDefaultValue,
  getFields,
  getRenderableValue,
  getValue
} from './utils';

const Table = <T,>(props: ITableProps<T>) => {
  const {
    title,
    data,
    fields,
    // loading = false,
    defaultEmptyValue = "--",
    noRecordMsg = "No Data",

    tableContainerClassName,
    tableClassName,
    tHeadClassName,
    tBodyClassName,
    trClassName,
    thClassName,
    tdClassName,
  } = props;

  const fieldsToRender: ITableRowFilled<T> = useMemo(
    () => getFields(fields),
    [fields]
  );

  return (
    <>
      {title && getRenderableValue(title, <h4>{title}</h4>)}

      {!data.length ? (
        getRenderableValue(
          noRecordMsg,
          <div>
            <h4>{noRecordMsg}</h4>
          </div>
        )
      ) : (
        <div className={` ${tableContainerClassName}`}>
          <table
            className={`w-full bg-primary-bg p-4 rounded-md relative ${tableClassName}`}
          >
            <thead
              className={`bg-tertiary-bg sticky top-0 z-[10] ${tHeadClassName}`}
            >
              <tr className={`${trClassName}`}>
                {fieldsToRender.map((field, index) => (
                  <th
                    className={`text-left px-4 py-2.5 text-sm font-semibold ${thClassName}`}
                    key={`${
                      title || "table"
                    }-head-cell-${index}-${Math.random()}`}
                  >
                    {field.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={`z-[1] ${tBodyClassName}`}>
              {data.map((row, rowIndex) => (
                <tr
                  className={`${
                    rowIndex % 2 === 0 ? "bg-primary-bg" : "bg-secondary-bg"
                  } ${trClassName}`}
                  key={`${
                    title || "table"
                  }-body-row-${rowIndex}-${Math.random()}`}
                >
                  {fieldsToRender.map((field, cellIndex) => (
                    <td
                      className={`px-4 py-2.5 text-sm font-regular ${tdClassName}`}
                      key={`${
                        title || "table"
                      }-body-cell-${cellIndex}-${Math.random()}`}
                    >
                      {getDefaultValue(getValue(field, row), defaultEmptyValue)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
