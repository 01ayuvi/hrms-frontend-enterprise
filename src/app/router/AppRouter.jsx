import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../../modules/auth/LoginPage";
import DashboardPage from "../../modules/dashboard/DashboardPage";
import EmployeePage from "../../modules/employees/EmployeePage";
import CreateEmployeePage from "../../modules/employees/CreateEmployeePage";
import EmployeeProfilePage from "../../modules/employees/EmployeeProfilePage";
import RecruitmentPage from "../../modules/recruitment/RecruitmentPage";
import CreateJobPage from "../../modules/recruitment/CreateJobPage";
import CandidatePage from "../../modules/recruitment/CandidatePage";
import CandidatePipelinePage from "../../modules/recruitment/CandidatePipelinePage";
import AttendancePage from "../../modules/attendance/AttendancePage";
import LeavePage from "../../modules/leave/LeavePage";
import OrganizationPage
  from "../../modules/organization/OrganizationPage";
import OrganizationPolicyPage
  from "../../modules/organization/OrganizationPolicyPage";


import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

function AppRouter() {
  return (<BrowserRouter> <Routes>

    <Route
      path="/"
      element={<LoginPage />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/employees"
      element={
        <ProtectedRoute>
          <MainLayout>
            <EmployeePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/employees/create"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CreateEmployeePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/employees/:employeeId"
      element={<ProtectedRoute> <MainLayout> <EmployeeProfilePage /> </MainLayout> </ProtectedRoute>
      }
    />

    <Route
      path="/recruitment"
      element={
        <ProtectedRoute>
          <MainLayout>
            <RecruitmentPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/recruitment/create"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CreateJobPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/recruitment/candidates"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CandidatePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/recruitment/pipeline"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CandidatePipelinePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/attendance"
      element={
        <ProtectedRoute>
          <MainLayout>
            <AttendancePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/leave"
      element={
        <ProtectedRoute>
          <MainLayout>
            <LeavePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/organization"
      element={
        <ProtectedRoute>
          <OrganizationPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/organization-policies"
      element={
        <OrganizationPolicyPage />
      }
    />
  </Routes>
  </BrowserRouter>

  );
}

export default AppRouter;
