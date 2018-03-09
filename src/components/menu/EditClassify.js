import React from 'react';
import {connect} from "dva";
import { Tag, Input, Tooltip, Icon } from 'antd';

const EditClassify = ({dispatch , fetch, location, menu}) => {

  const {classify,inputVisible,inputValue,inputRef} = menu;

  const tags = classify.map((tag, index) => {
    const isLongTag = tag.name.length > 20;
    const tagElem =
      <Tag key={tag.id} closable={true} afterClose={() => handleClose(tag)}>
        {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
      </Tag>
    ;
    return isLongTag ? <Tooltip title={tag.name} key={tag.id}>{tagElem}</Tooltip> : tagElem;
  });

  function handleClose(removedTag){
    const curClassify = classify.filter(tag => tag.id !== removedTag.id);
    dispatch({
      type:'menu/deleteClassify',
      classifyId:removedTag.id
    })
  };

  function showInput (){
      dispatch({
        type:'menu/showInput',
        inputVisible:true
      });
      // refDom.focus();
  };

  function handleInputChange(e) {
    dispatch({
      type:'menu/showInputValue',
      inputValue:e.target.value
    })
  };

  function handleInputConfirm (){
    if(inputValue!='' && inputValue!=undefined) {
      dispatch({
        type:'menu/addClassify',
        name:inputValue
      })
    }
  };
  let refDom;
  return (
      <div>
        {tags}
        {inputVisible && (
          <Input
            ref={(node) => refDom = node}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={(e)=>handleInputChange(e)}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />添加分类
          </Tag>
        )}
      </div>
  );
};

EditClassify.propTypes = {
};

function mapStateToProps({menu}) {
  return {menu};
}
export default connect(mapStateToProps)(EditClassify);
