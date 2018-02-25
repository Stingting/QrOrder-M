import React from 'react';
import {connect} from 'dva';
import MainLayout from '../components/common/MainLayout';
import MenuList from '../components/menu/MenuList';

import {Layout,Button} from 'antd';

const { Header, Content, Footer, Sider} = Layout;

function MenuPage({ dispatch , fetch, location, menu}) {

  const {menuList, loading,visible,food,file} = menu;
  const menuListProps = {menuList, loading,visible,food};

  /**
   * 获取食物详情
   * @param foodId
   */
  function getMenuDetail(foodId) {
      dispatch({
        type:'menu/getMenuDetail',
        foodId:foodId
      })
  }

  //关闭详情框
  function closeDialog() {
    dispatch({
      type : 'menu/closeDialog'
    })
  }

  /**
   * 保存食物
   * @param food
   */
  function saveFood(food) {
    console.log(`food=${food}`);
    dispatch({
      type:'menu/saveFood',
      food:food
    })
  }

  /**
   *
   * @param file
   */
  function changeFile(file) {
    dispatch({
      type:'menu/changeFile',
      file:file
    })
  }

  /**
   *
   */
  function uploadFile() {
    dispatch({
      type:'menu/uploadFile'
    })
  }

  /**
   * 删除食物
   * @param foodId
   */
  function deleteFood(foodId) {
    dispatch({
      type:'menu/deleteFood',
      foodId:foodId
    })
  }
 return (
    <MainLayout>
      <MenuList {...menuListProps}
                getMenuDetail={getMenuDetail}
                closeDialog={closeDialog}
                saveFood={saveFood}
                changeFile={changeFile}
                uploadFile={uploadFile}
                deleteFood={deleteFood}
      />
    </MainLayout>
  );
}
MenuPage.propTypes = {

};
function mapStateToProps({ menu}) {
  return {menu};
}
export default connect(mapStateToProps)(MenuPage);
