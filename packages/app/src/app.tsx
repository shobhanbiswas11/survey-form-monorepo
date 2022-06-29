import { QuestionDetailsPath } from "components";
import Flow from "components/Flow";
import QuestionDetails from "features/details";
import { FormPage } from "features/FormPage";
import { useAppDispatch } from "hooks";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { globalActions } from "store/globalActions";
import "./app.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(globalActions.appLoad());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="h-screen w-screen bg-gray-800 text-white p-8">
            <Flow />
          </div>
        }
      />
      <Route path="/form" element={<FormPage />} />
      <Route path={QuestionDetailsPath} element={<QuestionDetails />} />
    </Routes>
  );
};

export default App;
