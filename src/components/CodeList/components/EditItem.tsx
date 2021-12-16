import React, { useContext, useRef, useEffect } from 'react';
import { Input, Modal, message } from 'antd';
import { ITitleEdit } from '../index';
import { JSBoxContext } from '../../../store/context';
import { addCode, getCodeById, putCode } from '../../../utils/model';
import { createCode, setAllIdAndTitle } from '../../../store/actions';
import getLangText from '../../../utils/lang';

type IProps = {
  titleEdit: ITitleEdit;
  handleTitleChange: (arg0: Event) => void;
  onEditEnd: () => void;
};
export default function({ titleEdit, handleTitleChange, onEditEnd }: IProps) {
  const { store, dispatch } = useContext(JSBoxContext);
  const { allIdTitles, currItem } = store;
  const input = useRef(null);

  useEffect(() => {
    if (input?.current) {
      input.current.focus();
    }
  }, []);

  function handleTitleSave() {
    const { title, type, id, initialTitle } = titleEdit;
    console.log(
      title,
      allIdTitles,
      allIdTitles.some(item => {
        item.title == title;
      }),
    );
    if (!title) {
      onEditEnd();
    } else if (title === initialTitle) {
      onEditEnd();
    } else if (allIdTitles.some(item => item.title === title)) {
      Modal.error({
        title: getLangText('noDuplicate'),
        onOk: () => {
          if (input?.current) {
            setTimeout(() => {
              input.current.focus();
            }, 100);
          }
        },
      });
    } else {
      if (type === 'add') {
        addCode(title, '').then(id => {
          dispatch(
            createCode({
              id,
              title,
              content: '',
            }),
          );

          onEditEnd();
        });
      } else {
        const idTitleIndex = allIdTitles.findIndex(item => item.id === id);
        allIdTitles[idTitleIndex] = {
          id,
          title,
        };

        dispatch(setAllIdAndTitle([...allIdTitles]));

        getCodeById(id).then(item => {
          putCode({
            id,
            title,
            content: item.content,
          });
        });

        onEditEnd();
      }
    }
  }

  return (
    <Input
      size="small"
      ref={input}
      value={titleEdit.title}
      onChange={handleTitleChange}
      onBlur={handleTitleSave}
    />
  );
}
