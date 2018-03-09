import React from 'react';
import {connect} from "dva";
import { Tag, Input, Tooltip, Icon ,Button} from 'antd';

const EditType = ({dispatch , fetch, location, menu}) => {

  const {foodType,inputFoodTypeVisible,inputFoodTypeValue} = menu;

  const tags = foodType.map((tag, index) => {
    const isLongTag = tag.length > 20;
    const tagElem =
      <Tag key={index} closable={true} afterClose={() => handleClose(tag,index)}>
        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
      </Tag>
    ;
    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
  });

  function handleClose(removedTag,index){
    // const curType = foodType.filter(tag => tag !== removedTag);
    foodType.splice(index,1);
    dispatch({
      type:'menu/deleteFoodType',
      curType:foodType
    })
  };

  function showInput (){
    dispatch({
      type:'menu/showFoodTypeInput',
      inputFoodTypeVisible:true
    });
    // refDom.focus();
  };

  function handleFoodTypeInputChange(e) {
    dispatch({
      type:'menu/showInputFoodTypeValue',
      inputFoodTypeValue:e.target.value
    })
  };

  function handleFoodTypeInputConfirm (){
    if(inputFoodTypeValue!='' && inputFoodTypeValue!=undefined) {
      dispatch({
        type:'menu/addFoodType',
        name:inputFoodTypeValue,
        inputFoodTypeValue:'',
        inputFoodTypeVisible:false
      })
    }
  };
  let refDom;
  return (
    <div>
      {tags}
      {inputFoodTypeVisible && (
        <Input
          ref={(node) => refDom = node}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputFoodTypeValue}
          onChange={(e)=>handleFoodTypeInputChange(e)}
          onBlur={handleFoodTypeInputConfirm}
          onPressEnter={handleFoodTypeInputConfirm}
        />
      )}
      {/*<Button onClick={handleFoodTypeInputConfirm}>确定</Button>*/}
      {!inputFoodTypeVisible && (
        <Tag
          onClick={showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="plus" />添加食物规格
        </Tag>
      )}
    </div>
  );
};

EditType.propTypes = {
};

function mapStateToProps({menu}) {
  return {menu};
}
export default connect(mapStateToProps)(EditType);
