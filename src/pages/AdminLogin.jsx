import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch {
      setError('Невалиден имейл или парола')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      {/* grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px' }}
      />

      <div className="w-full max-w-sm">
        {/* logo */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.35em] text-[#8A8070] uppercase mb-2">Brillare</p>
          <h1 className="font-cormorant text-3xl text-[#EDE8DF] tracking-wide">by BM</h1>
          <div className="w-10 h-px bg-[#C9A84C] mx-auto mt-4" />
        </div>

        <p className="text-center text-[11px] tracking-[0.25em] text-[#8A8070] uppercase mb-8">
          Администраторски достъп
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Имейл"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#2A2A2A] text-[#EDE8DF] text-sm py-3 px-0 placeholder-[#4A4540] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Парола"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#2A2A2A] text-[#EDE8DF] text-sm py-3 px-0 placeholder-[#4A4540] outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-4 bg-[#C9A84C] text-[#0A0A0A] text-[11px] tracking-[0.25em] uppercase font-medium disabled:opacity-50 transition-opacity"
          >
            {loading ? '...' : 'Вход'}
          </button>
        </form>
      </div>
    </div>
  )
}
