/* eslint-disable react-hooks/exhaustive-deps */
import TableCategory from "~/components/atoms/TableCategory";
import { IFormCategoryData } from "../types/IFormCategoryData";
import { IUseTableFields } from "../types/IUseTableFields";
import { ISettings } from "../types/IUseInputMaster";

export interface ITableFieldsRendererProps extends IUseTableFields {
  disableAll?: boolean;
  formCategoryData?: IFormCategoryData | undefined;
  isFormSubmitted?: boolean;
  settings?: ISettings;
}
export interface ITableFieldsProps extends ITableFieldsRendererProps {
  isFormSubmitted?: boolean;
}

const TableFieldsRenderer: React.FC<ITableFieldsProps> = ({
  values,
  formCategoryData,
  handleFieldChange,
  handleCellChange,
  addColumn,
  deleteColumn,
  isFormSubmitted,
  handleInputChange,
  handleInputBlur,
  handleTableSetKey,
}) => {

  return (
    <TableCategory
      isFormSubmitted={isFormSubmitted}
      title={"Financial Spreading"}
      values={values}
      formCategoryData={formCategoryData}
      addColumn={addColumn}
      deleteColumn={deleteColumn}
      handleCellChange={handleCellChange}
      handleFieldChange={handleFieldChange}
      handleTableSetKey={handleTableSetKey}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
    />
  )
}

export default TableFieldsRenderer;