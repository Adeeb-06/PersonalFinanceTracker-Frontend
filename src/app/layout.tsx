import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { FirebaseAuthProvider } from "@/providers/FirebaseAuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import BalanceProvider from "@/providers/BalanceProvider";
import UserProvider from "@/providers/UserProvider";
import ExpenseProvider from "@/providers/ExpenseProvider";
import BudgetProvider from "@/providers/BudgetProvider";
import CategoryProvider from "@/providers/CategoryProvider";
import DashboardProvider from "@/providers/DashboardProvider";
import SavingsProvider from "@/providers/SavingsProvider";

export const metadata: Metadata = {
  title: "TrackIt - Smart Money Management",
  description: "Track income, expenses and savings with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FirebaseAuthProvider>
          <ReactQueryProvider>
            <UserProvider>
              <ExpenseProvider>
                <BudgetProvider>
                  <BalanceProvider>
                    <CategoryProvider>
                      <DashboardProvider>
                        <SavingsProvider>
                          <ToastContainer />
                          {children}
                        </SavingsProvider>
                      </DashboardProvider>
                    </CategoryProvider>
                  </BalanceProvider>
                </BudgetProvider>
              </ExpenseProvider>
            </UserProvider>
          </ReactQueryProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
