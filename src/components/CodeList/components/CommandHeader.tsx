import React from 'react';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import iconSvg from '@/images/icon.png';

interface IProps {
  onAdd: (event: MouseEvent<HTMLElement, MouseEvent>) => void,
}

export default function({ onAdd } : IProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        background: '',
      }}
    >
      <img src={iconSvg} style={{ width: '30px' }} />
      <h2 style={{ color: '#f1f1f1', margin: '0 auto 0 5px' }}>JS BOX</h2>
      <Button
        icon={<PlusOutlined />}
        size="small"
        type="link"
        ghost
        onClick={onAdd}
      />
    </div>
  );
}
