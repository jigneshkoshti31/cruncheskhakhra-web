"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Toast container ko fixed width se hata kar responsive aur chota banaya hai
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-100 group-[.toaster]:shadow-[0_10px_30px_rgba(0,0,0,0.08)] group-[.toaster]:rounded-xl group-[.toaster]:py-3 group-[.toaster]:px-4 group-[.toaster]:font-medium group-[.toaster]:w-fit group-[.toaster]:min-w-[280px] group-[.toaster]:max-w-[400px] group-[.toaster]:mx-auto dark:group-[.toaster]:bg-gray-950 dark:group-[.toaster]:text-gray-50 dark:group-[.toaster]:border-gray-800",
          description:
            "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400 text-[12px]",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50 dark:group-[.toast]:bg-gray-50 dark:group-[.toast]:text-gray-900",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400",

          // Success & Error ka ekdam premium pastel look (jaise Apple ya Stripe me hota hai)
          success:
            "group-[.toaster]:bg-green-50/90 group-[.toaster]:text-green-700 group-[.toaster]:border-green-100/80 dark:group-[.toaster]:bg-green-950/30 dark:group-[.toaster]:text-green-400 dark:group-[.toaster]:border-green-900/50",
          error:
            "group-[.toaster]:bg-red-50/90 group-[.toaster]:text-red-700 group-[.toaster]:border-red-100/80 dark:group-[.toaster]:bg-red-950/30 dark:group-[.toaster]:text-red-400 dark:group-[.toaster]:border-red-900/50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
