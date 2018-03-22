import React from 'react';
import {connect} from 'dva';
import TableList from '../components/table/TableList';
import styles from '../assets/less/global.less';
import {Icon} from 'antd';
import {NavBar} from 'antd-mobile';

function TablePage({dispatch,history,dining}) {

  const {tableList,loading,visible,table} = dining;
  const tableListProps = {tableList, loading,visible,table};

  /**
   * 编辑餐桌
   * @param tableId
   */
  function editTable(tableId,e) {
    e.preventDefault();
    e.stopPropagation();
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
  function deleteTable(tableId,e) {
    e.preventDefault();
    e.stopPropagation(); //阻止冒泡
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

  /**
   * 选择跳转订单列表或者聊天室
   */
  function selectedTo(id, selected) {
    dispatch({
      type:'dining/selectedTo',
      id:id,
      selected:selected
    })
  }
  return (
    <div>
      <NavBar
        mode="dark"
        leftContent="餐桌" className={styles.navbar}
        icon={<Icon type="left" />}
        onLeftClick={() => backToPortal()}>
      </NavBar>
      <TableList {...tableListProps}
            editTable={editTable}
            closeDialog={closeDialog}
            saveTable={saveTable}
            deleteTable={deleteTable}
            selectedTo={selectedTo}
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
