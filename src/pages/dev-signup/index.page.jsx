// pages/dev-signup/index.page.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '~/store/auth';

const DevSignUp = () => {
  const dispatch = useDispatch();

  const handleTestSignup = async () => {
    try {
      await dispatch(
        signup({
          email: 'test@example.com',
          password: 'test1234',
          name: 'テストくん',
        }),
      ).unwrap();
      alert('テストアカウントでサインアップ成功！');
    } catch (error) {
      alert(`サインアップ失敗: ${error.message}`);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>開発用サインアップ</h1>
      <button onClick={handleTestSignup}>テストアカウント登録</button>
    </main>
  );
};

export default DevSignUp;