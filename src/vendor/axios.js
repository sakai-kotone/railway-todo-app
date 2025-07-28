import axios from 'axios';

/*
 * axiosに対して baseURL（APIのベースURL）を設定し、
 * トークン無効時のリダイレクト処理も追加する
 */
const baseURL = import.meta.env.VITE_RAILWAY_TODO_API_URL;

// ✅ ログで確認できるように！
console.log('🌐 API Base URL:', baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
 * レスポンス時のインターセプター
 * 401エラー（未認証）の場合はログアウト処理＆ログイン画面に遷移
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('railway-todo-app__token');

      // NOTE: React Router経由ではなく window.location で直接遷移
      if (location.pathname !== '/signin') {
        location.href = '/signin';
      }
    }

    return Promise.reject(err);
  },
);

/*
 * axiosの本体ではなく、このインスタンスを使うようにする
 */
export default axiosInstance;