import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from '~/components/Sidebar';
import Home from '~/pages/index.page';
import NotFound from '~/pages/404';
import SignIn from '~/pages/signin/index.page';
import SignUp from '~/pages/signup/index.page';
import NewList from '~/pages/list/new/index.page';
import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page';
import EditList from '~/pages/lists/[listId]/edit/index.page';
import ListIndex from '~/pages/lists/[listId]/index.page';
import DevSignUp from '~/pages/dev-signup/index.page'; // ←✨ 追加

export const Router = () => {
  const auth = useSelector((state) => state.auth.token !== null);

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Routes>
          {/* 認証不要ページ */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dev-signup" element={<DevSignUp />} /> {/* ←✨ 追加ルート */}

          {/* 認証ありページ */}
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/lists/:listId" element={<ListIndex />} />
              <Route path="/list/new" element={<NewList />} />
              <Route
                path="/lists/:listId/tasks/:taskId"
                element={<EditTask />}
              />
              <Route path="/lists/:listId/edit" element={<EditList />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}

          {/* 未定義ページ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};