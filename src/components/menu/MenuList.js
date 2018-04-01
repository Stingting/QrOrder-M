import React from 'react';
import {List} from 'antd';
import {Button,WhiteSpace,Modal,ActionSheet,WingBlank} from 'antd-mobile';
import EditFood from './EditFood';
import styles from './MenuList.less';
const alert = Modal.alert;

const MenuList = ({menuList, loading,getMenuDetail,visible,food,
                    closeDialog,saveFood,file,uploadLoading,changeFile,uploadFile,deleteFood}) => {

    // fix touch to scroll background page on iOS
   // https://github.com/ant-design/ant-design-mobile/issues/307
  // https://github.com/ant-design/ant-design-mobile/issues/163
  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
  let wrapProps;
  if (isIPhone) {
    wrapProps = {
      onTouchStart: e => e.preventDefault(),
    };
  }
  function showActionSheet (id) {
    const BUTTONS = ['编辑', '删除', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        // title: 'title',
        message: '',
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
      },
      (buttonIndex) => {
        const action =BUTTONS[buttonIndex];
        if(action === '编辑') {
          getMenuDetail(id);
        } else if(action === '删除') {
          alert('删除', '确定删除吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => deleteFood(id)},
          ])
        } else {
          console.log(`action=${action}`);
        }
      });
  };
  return (
    <div>
      <div className={styles.content}>
        <WingBlank>
          <List
            split={true}
            loading={loading}
            itemLayout="horizontal"
            dataSource={menuList}
            size="middle"
            renderItem={item => (
              <List.Item onClick={()=>showActionSheet(item.id)}>
                <List.Item.Meta
                  avatar={<img width={100} height={100} src={item.pic} alt={item.name}/>}
                  title={<span className={styles.dishname}>{item.name}</span>}
                  description={
                    <div className={styles.desc}>
                      <div className={styles.row1}>{item.desc}{item.type.name}</div>
                      <div className={styles.row2}>月售:&nbsp;{item.saleCount}</div>
                      <div className={styles.row3}>&yen;{item.price}</div>
                    </div>}
                />
                <div style={{display: item.num===0?'none':'inline'}}>剩余{item.num}份</div>
                <div style={{display: item.num===0?'inline':'none'}}>售馨</div>
              </List.Item>
            )}
          />
        </WingBlank>
      </div>
      <div style={{textAlign:'center', width:'100%'}}>
        <WhiteSpace />
        <Button type="primary" size='small' onClick={()=>getMenuDetail()}>新增</Button>
      </div>

      <Modal
        title="编辑食物"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDialog(true)}>
        <EditFood
          food={food}
          saveFood={saveFood}
          changeFile={changeFile}
          uploadFile={uploadFile}
        />
      </Modal>

    </div>
  );
};

MenuList.propTypes = {
};

export default MenuList;
