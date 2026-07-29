import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PublicInvoice from './pages/PublicInvoice.jsx'
import PublicQuote from './pages/PublicQuote.jsx'
import PublicBill from './pages/PublicBill.jsx'
import PublicLetter from './pages/PublicLetter.jsx'

// Route paths here must match exactly what Erp/backend/utils/email.go builds
// into the emailed links: fmt.Sprintf("%s/invoice/public/%s", appURL, token),
// and the same for /quote/public/, /bill/public/, /letter/public/. If those
// change on the backend, update here too — there's no shared source of truth
// between the two repos.
function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <p style={{ fontSize: 15 }}>Nothing here — check the link you were sent.</p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', fontFamily: "'Sora', sans-serif" }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>Spifora Document Viewer</p>
        <p style={{ fontSize: 13 }}>This page only works with a link emailed to you — invoice, quote, bill, or letter.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      {/*
        IMPORTANT: style must be fully transparent here.
        nexusToast uses toast.custom() which renders its own complete UI.
        Any background/padding/shadow on the Toaster wrapper will paint
        over the custom component — making toasts invisible or miscoloured.
      */}
      <Toaster
        position="top-right"
        gutter={10}
        containerStyle={{ top: 20, right: 20 }}
        toastOptions={{
          style: { background: 'transparent', boxShadow: 'none', padding: 0, margin: 0 },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/public/:token" element={<PublicInvoice />} />
        <Route path="/quote/public/:token" element={<PublicQuote />} />
        <Route path="/bill/public/:token" element={<PublicBill />} />
        <Route path="/letter/public/:token" element={<PublicLetter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
