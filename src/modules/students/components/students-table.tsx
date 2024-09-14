import { Tag } from 'antd';

import { PaginationMeta } from '@/common/entities';
import { Student } from '@/common/entities/student';
import CommonTable from '@/common/components/common-table';
import styles from './students-table.module.css';

interface Props {
  students?: Student[];
  isLoading?: boolean;
  hasError?: boolean;
  paginationMeta?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

const StudentsTable = ({
  students = [],
  isLoading = false,
  hasError = false,
  paginationMeta,
  onPageChange = () => ({}),
}: Props) => {
  const getStateLabel = (role: number) => {
    switch (role) {
      case 0:
        return 'Плохо';
      case 1:
        return 'Нейтрально';
      case 2:
        return 'Хорошо';
      default:
        return 'Неизвестно';
    }
  };
  const getColorForState = (state: number) => {
    switch (state) {
        case 0:
            return "cyan";
        case 1:
            return "geekblue";
        case 2:
            return "red";
        default:
            return "black"; // Default color if state doesn't match any specific case
    }
  } 
  console.log(students, "Students")

  return (
    <div className={styles.wrapper}>
      <CommonTable>
        <CommonTable.Header className={styles.row}>
          <CommonTable.Cell>Фамилия</CommonTable.Cell>
          <CommonTable.Cell>Имя</CommonTable.Cell>
          <CommonTable.Cell>Класс</CommonTable.Cell>
          <CommonTable.Cell>Состояние</CommonTable.Cell>
          <CommonTable.Cell>Учеба</CommonTable.Cell>
          <CommonTable.Cell>Настроение</CommonTable.Cell>
        </CommonTable.Header>
        {isLoading && <CommonTable.LoadingIndicator />}
        {!isLoading && hasError && <CommonTable.ErrorPlaceholder />}
        {!isLoading && !hasError && students.length === 0 && (
          <CommonTable.EmptyPlaceholder />
        )} 
        {!isLoading &&
          !hasError &&
          students.map((student) => (
            <CommonTable.Row key={student.lastName} className={styles.row}>
              <CommonTable.Cell className={styles.surname}>{student.lastName}</CommonTable.Cell>
              <CommonTable.Cell className={styles.name}>{student.firstName}</CommonTable.Cell>
              <CommonTable.Cell>{student.class}</CommonTable.Cell>
              <CommonTable.Cell>
                <Tag color={getColorForState(student.overallHealth)}>{getStateLabel(student.overallHealth)}</Tag>
              </CommonTable.Cell>
              <CommonTable.Cell>
                <Tag color={getColorForState(student.overallKundelik)}>{getStateLabel(student.overallKundelik)}</Tag>
              </CommonTable.Cell>
              <CommonTable.Cell>
                <Tag color={getColorForState(student.overallMood)}>{getStateLabel(student.overallMood)}</Tag>
              </CommonTable.Cell>
            </CommonTable.Row>
          ))}
        {!isLoading && !hasError && paginationMeta && (
          <CommonTable.Pagination
            paginationMeta={paginationMeta}
            onPageChange={onPageChange}
          />
        )}
      </CommonTable>
    </div>
  );
};

export default StudentsTable;
