import React, { useContext, useState } from 'react';
import { Menu, Button, Input, Modal } from 'antd';
import { JSBoxContext } from '../../store/context';
import { addCode, getCodeById, delCode } from '../../utils/model';
import { setAllIdAndTitle, setCurrItem } from '../../store/actions';
import { IID } from '../../types';
import EditItem from './components/EditItem';
import CommandHeader from './components/CommandHeader';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import styles from './index.module.less';

const MenuItem = Menu.Item;

interface ITitleInEdit {
  title: string;
  id: IID;
  initialTitle: string;
  type: 'edit';
}

interface ITitleInAdd {
  title: string;
  type: 'add';
}

export type ITitleEdit = ITitleInEdit | ITitleInAdd | null;

export default function CodeList() {
  const { store, dispatch } = useContext(JSBoxContext);
  const { allIdTitles, currItem, demos } = store;
  const [titleEdit, setTitleEdit]: [ITitleEdit, Function] = useState(null);

  function handleTitleChange(ev) {
    setTitleEdit({
      ...titleEdit,
      title: ev.target.value,
    });
  }

  function handleCurrItemChange(id: IID) {
    if (typeof id === 'string' && id.startsWith('demo-')) {
      dispatch(setCurrItem(demos.find(item => item.id === id)));
    } else {
      getCodeById(id).then(res => {
        dispatch(setCurrItem(res));
      });
    }
  }

  function onEditEnd() {
    setTitleEdit(null);
  }

  function onEdit(ev, item) {
    ev.stopPropagation();
    setTitleEdit({
      type: 'edit',
      title: item.title,
      initialTitle: item.title,
      id: item.id,
    });
  }

  function onDelete(ev, item, index) {
    ev.stopPropagation();
    delCode(item.id);
    allIdTitles.splice(index, 1);
    dispatch(setAllIdAndTitle([...allIdTitles]));
  }

  return (
    <div>
      <CommandHeader
        onAdd={() => {
          setTitleEdit({ title: '', type: 'add' });
        }}
      />
      <Menu theme="dark" selectedKeys={[`${currItem?.id}`]}>
        <label className={styles.label}>&gt; 示例</label>
        {demos.map(item => (
          <MenuItem key={item.id} onClick={() => handleCurrItemChange(item.id)}>
            {item.title}
          </MenuItem>
        ))}
        <label className={styles.label}>&gt;本地</label>
        {allIdTitles.map((item, index) => (
          <MenuItem
            key={`${item.id}`}
            onClick={() => handleCurrItemChange(item.id)}
          >
            {titleEdit!?.type === 'edit' && titleEdit?.id === item.id ? (
              <EditItem
                titleEdit={titleEdit}
                handleTitleChange={handleTitleChange}
                onEditEnd={onEditEnd}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={styles.title}>{item.title}</div>
                <Button
                  style={{ marginLeft: 'auto' }}
                  icon={<EditOutlined />}
                  onClick={ev => onEdit(ev, item)}
                  type="link"
                  ghost
                  size="small"
                />
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  ghost
                  onClick={ev => onDelete(ev, item, index)}
                  size="small"
                />
              </div>
            )}
          </MenuItem>
        ))}
        {titleEdit!?.type === 'add' && (
          <MenuItem key="add">
            <EditItem
              titleEdit={titleEdit}
              handleTitleChange={handleTitleChange}
              onEditEnd={onEditEnd}
            />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
