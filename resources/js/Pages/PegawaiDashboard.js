import React from 'react';

export default function PegawaiDashboard(props) {
    return (
        <div className="mt-8 bg-white dark:bg-white-800 overflow-hidden shadow sm:rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6">
                <div className="flex items-center">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                    >
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>

                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-black">
                        Total Perolehan Skor
                    </div>
                </div>

                <div className="ml-12">
                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        {props.auth.user.total_score}
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
                <div className="flex items-center">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                    >
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        {/* <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path> */}
                    </svg>

                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-black">
                        Total Aktivitas Diajukan
                    </div>
                </div>

                <div className="ml-12">
                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-black">
                    {props.auth.user.activity_count} Aktivitas
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>

                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-black">
                        Aktivitas Disetujui
                    </div>
                </div>

                <div className="ml-12">
                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-black">
                    {props.auth.user.approved_activity_count} Aktivitas
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l">
                <div className="flex items-center">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gray-500"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>

                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-black">
                        Aktivitas Ditolak
                    </div>
                </div>

                <div className="ml-12">
                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-black">
                    {props.auth.user.rejected_activity_count} Aktivitas
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}
