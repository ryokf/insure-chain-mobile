import React from 'react';
import ClaimsPage from './ClaimsPage';
import HomePage from './HomePage';
import MonitoringPage from './MonitoringPage';
import SettingsPage from './SettingsPage';

export type AppPageType = 'home' | 'protection' | 'credentials' | 'settings';

export default function AppPages() {
    const [currentPage, setCurrentPage] = React.useState<AppPageType>('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'protection':
                return (
                    <MonitoringPage
                        onNavigate={setCurrentPage}
                    />
                );
            case 'credentials':
                return (
                    <ClaimsPage
                        onNavigate={setCurrentPage}
                    />
                );
            case 'settings':
                return (
                    <SettingsPage
                        onNavigate={setCurrentPage}
                    />
                );
            case 'home':
            default:
                return (
                    <HomePage
                        onNavigate={setCurrentPage}
                    />
                );
        }
    };

    return renderPage();
}
