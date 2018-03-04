import React from 'react';
import {connect} from 'dva';
import TableList from '../components/table/TableList';
import styles from '../assets/less/global.less';
import {Icon} from 'antd';

function TablePage({dispatch,history,dining}) {

  const {tableList,loading,visible,table} = dining;
  const tableListProps = {tableList, loading,visible,table};

  /**
   * 编辑餐桌
   * @param tableId
   */
  function editTable(tableId) {
    dispatch({
      type:'dining/editTable',
      tableId:tableId
    })
  }

  //关闭餐桌编辑框
  function closeDialog() {
    dispatch({
      type : 'dining/closeDialog'
    })
  }

  /**
   * 保存餐桌信息
   * @param table
   */
  function saveTable(table) {
    console.log(`table=${table}`);
    dispatch({
      type:'dining/saveTable',
      table:table
    })
  }

  /*
   *删除餐桌
   */
  function deleteTable(tableId) {
    dispatch({
      type:'dining/deleteTable',
      tableId:tableId
    })
  }

  /**
   * 返回首页
   */
  function backToPortal() {
    dispatch({
      type:'portal/backToPortal'
    })
  }
  return (
    <div>
      <div className={styles["top-banner"]} onClick={backToPortal}><Icon type="left"/>餐桌</div>
      <TableList {...tableListProps}
            editTable={editTable}
            closeDialog={closeDialog}
            saveTable={saveTable}
            deleteTable={deleteTable}
      />
    </div>
  );
}

TablePage.propTypes = {
};

function mapStateToProps({dining}) {
  return {dining};
}

export default connect(mapStateToProps)(TablePage);
