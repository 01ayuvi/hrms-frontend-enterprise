import { BrowserRouter, Routes, Route } from "react-router-dom";
import PayrollPage from "../../modules/payroll/PayrollPage";
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
import PerformancePage from "../../modules/performance/PerformancePage";
import DocumentsPage from "../../modules/documents/DocumentsPage";

import RegisterPage from "../../modules/auth/RegisterPage";
import CreateUserPage from "../../modules/users/CreateUserPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import DepartmentsPage from "../../modules/departments/DepartmentsPage";
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
          <MainLayout>
            <OrganizationPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/organization-policies"
      element={
        <ProtectedRoute>
          <MainLayout>
            <OrganizationPolicyPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/payroll"
      element={
        <ProtectedRoute>
          <MainLayout>
            <PayrollPage />
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
      path="/performance"
      element={
        <ProtectedRoute>
          <MainLayout>
            <PerformancePage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/documents"
      element={
        <ProtectedRoute>
          <MainLayout>
            <DocumentsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/register"
      element={<RegisterPage />}
    />
    <Route
      path="/users/create"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CreateUserPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/departments"
      element={
        <ProtectedRoute>
          <MainLayout>
            <DepartmentsPage />
          </MainLayout>
        </ProtectedRoute>
      }
    />
  </Routes>
  </BrowserRouter>

  );
}

export default AppRouter;
