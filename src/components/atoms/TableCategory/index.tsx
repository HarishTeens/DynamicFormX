import { IFieldsTableMap, ITableProps } from './types';
import {
  getRenderableValue,
} from './utils';
import Input from '../Input';
import { categorizeForms } from '~/components/molecules/InputFields/utils/categorizeForms';
import InputFieldItem from '~/components/molecules/InputFields/components/InputFieldItem';
import { IInputFieldState, IInputFieldsState } from '~/components/molecules/InputFields/types/IInputFieldsState';

const TableCategory = (props: ITableProps) => {
  const {
    title,
    values,
    formCategoryData,
    noRecordMsg = "No Data",
    isFormSubmitted,

    tableContainerClassName,
    tableClassName,
    tHeadClassName,
    tBodyClassName,
    trClassName,
    tdClassName,
    addColumn,
    deleteColumn,
    handleTableSetKey,
    handleInputChange,
    handleInputBlur,
    handleFieldChange
  } = props;

  const fieldsToRender: IFieldsTableMap = Object.keys(values).map(key => ({ title: key }));
  if (!fieldsToRender.length)
    return getRenderableValue(
      noRecordMsg,
      <div>
        <h4>{noRecordMsg}</h4>
      </div>
    )

  const categories = Object.values(categorizeForms(values[Object.keys(values)[0]], formCategoryData)).sort((catA, catB) => {
    return catA.priority - catB.priority;
  })

  return (
    <>
      {title && getRenderableValue(title, <h4 className='inline'>{title}</h4>)}
      <button className='float-right mb-4' onClick={addColumn}>Add (+)</button>
      <div className={` ${tableContainerClassName}`}>
        <table
          className={`w-full bg-primary-bg p-4 rounded-md relative ${tableClassName}`}
        >
          <thead
            className={`bg-tertiary-bg sticky top-0 z-[10] ${tHeadClassName}`}
          >
            <tr className={`${trClassName}`}>
              <th
                className={`text-left px-4 py-2.5 text-sm font-semibold`}
                key={`${title || "table"
                  }-head-cell}`}
              ></th>
              {fieldsToRender.map((field, index) => (
                <th
                  className={`text-left px-4 py-2.5 text-sm font-semibold`}
                  key={`${title || "table"
                    }-head-cell-${index}`}
                >
                  <div className='flex'>
                    <div className='w-[80%]'>
                      <Input
                        inputClassName='mr-3'
                        value={field.title}
                        onChange={(e) => handleFieldChange(index, e.target.value)}
                        inputProps={{ type: "number", max: (new Date()).getFullYear() + 10 }}
                      />
                    </div>
                    <div className='w-[20%]'>
                      <button className='px-5 mx-auto' onClick={() => deleteColumn(field.title)}>-</button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={`z-[1] ${tBodyClassName}`}>
            {categories.map((category) => {
              return (
                <>
                  <tr className="category">
                    <td
                      colSpan={fieldsToRender.length}
                      className={`text-left px-4 py-2.5 text-sm font-bold ${tdClassName}`}
                    >
                      {category.title}
                    </td>
                  </tr>

                  {Object.values(category.formFieldData).map((fieldData, rowIndex) => {
                    return (
                      <tr
                        key={`${title || "table"
                          }-body-row-${rowIndex}}`}
                      >
                        <td
                          className={`px-4 py-2.5 text-sm font-regular ${tdClassName}`}
                          key={`${title || "table"
                            }-body-cell-${rowIndex}-${Math.random()}`}
                        >
                          <p className='mb-1 text-sm font-semibold'>
                            {fieldData.name}
                            {(fieldData as IInputFieldState).required && <span className='text-error'> *</span>}
                          </p>
                        </td>
                        {fieldsToRender.map((field, cellIndex: number) => {
                          const input = values[field.title][(fieldData as IInputFieldState).id as keyof IInputFieldsState] as IInputFieldState;
                          return <td
                            className={`px-4 py-2.5 text-sm font-regular ${tdClassName}`}
                            key={`${title || "table"
                              }-body-cell-${cellIndex}}`}
                          >
                            <InputFieldItem
                              cellDisplay={true}
                              input={input}
                              handleInputChange={handleInputChange(field.title)}
                              handleInputBlur={handleInputBlur(field.title)}
                              handleSetKey={handleTableSetKey(field.title)}
                              values={values[field.title]}
                              isFormSubmitted={isFormSubmitted}
                            />
                          </td>
                        })}
                      </tr>
                    )
                  }
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCategory;
