import { Toaster } from 'sonner'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { Canvas } from '../3d/Canvas'
import { ExportModal } from '../components/features/export/ExportModal'
import { FloatingControls } from '../components/features/configurator/FloatingControls'
import './App.css'

function App() {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 relative">
                    <Canvas className="h-full w-full" />
                    <FloatingControls />
                </main>
            </div>

            <ExportModal />
            <Toaster position="bottom-right" />
        </div>
    )
}

export default App
