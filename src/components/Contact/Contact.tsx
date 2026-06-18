'use client'
import { useState }       from 'react'
import { useLangContext } from '@/context/LangContext'
import type { Lang }      from '@/types'
import styles             from './Contact.module.css'

const MSG = {
  sending:  { ru: 'Отправка…',                              ky: 'Жөнөтүлүүдө…',                                  en: 'Sending…' },
  required: { ru: 'Укажите имя и телефон',                  ky: 'Атыңызды жана телефонду жазыңыз',                en: 'Please enter your name and phone' },
  error:    { ru: 'Не удалось отправить. Попробуйте ещё раз или позвоните нам.',
              ky: 'Жөнөтүлгөн жок. Кайра аракет кылыңыз же бизге чалыңыз.',
              en: 'Could not send. Please try again or call us.' },
} satisfies Record<string, Record<Lang, string>>

const EMPTY = { name: '', phone: '', company: '', product: '', comment: '', website: '' }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { t, lang, settings, products } = useLangContext()
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  const sent = status === 'sent'
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (status === 'sending') return
    const name = form.name.trim()
    const phone = form.phone.trim()
    if (name.length < 2 || phone.length < 5) {
      setStatus('error'); setErrMsg(MSG.required[lang]); return
    }
    setStatus('sending'); setErrMsg('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) throw new Error('failed')
      setStatus('sent'); setForm(EMPTY)
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error'); setErrMsg(MSG.error[lang])
    }
  }

  const INFO = [
    {
      icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
      ),
      label: t('contact_address_lbl'),
      val: settings.address || t('contact_address'),
    },
    {
      icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
      ),
      label: t('contact_phone_lbl'),
      val: settings.phone || t('contact_phone'),
    },
    {
      icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
      ),
      label: t('contact_email_lbl'),
      val: settings.email || t('contact_email'),
    },
    {
      icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
      ),
      label: t('contact_hours_lbl'),
      val: settings.hours || t('contact_hours'),
    },
  ]

  return (
      <section className={`sec ${styles.section}`} id="contact">
        <div className={`${styles.grid} two-col`}>

          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="reveal-l">
            <div className="eyebrow">{t('contact_eyebrow')}</div>
            <h2 className="sec-title">{t('contact_title')}</h2>
            <p className="sec-sub">{t('contact_sub')}</p>
            {INFO.map(c => (
                <div key={c.label} className={styles.cd}>
                  <div className={styles.cdIcon}>{c.icon}</div>
                  <div>
                    <div className={styles.cdLbl}>{c.label}</div>
                    <div className={styles.cdVal}>{c.val}</div>
                  </div>
                </div>
            ))}
          </div>

          {/* ФОРМА */}
          <div className={`${styles.form} reveal-r`}>
            <div className={styles.formTitle}>{t('contact_form_title')}</div>
            <div className={styles.formSub}>{t('contact_form_sub')}</div>

            <div className={`${styles.fRow} f-row-grid`}>
              <div className={styles.field}>
                <label>{t('contact_name')}</label>
                <input type="text" placeholder="Айгуль Бекова" value={form.name} onChange={set('name')}/>
              </div>
              <div className={styles.field}>
                <label>{t('contact_phone_label')}</label>
                <input type="tel" placeholder="+996 700 000 000" value={form.phone} onChange={set('phone')}/>
              </div>
            </div>

            <div className={styles.field}>
              <label>{t('contact_company')}</label>
              <input type="text" placeholder="ОсОО «Ромашка»" value={form.company} onChange={set('company')}/>
            </div>

            <div className={styles.field}>
              <label>{t('contact_product')}</label>
              <select value={form.product} onChange={set('product')}>
                <option value="">{t('contact_product_ph')}</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>{t('contact_comment')}</label>
              <textarea placeholder="Опишите вашу ситуацию..." value={form.comment} onChange={set('comment')}/>
            </div>

            {/* honeypot: невидимое поле-ловушка для ботов */}
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={set('website')}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <button
                className={`${styles.submit} ${sent ? styles.sent : ''}`}
                onClick={submit}
                disabled={status === 'sending'}
            >
              {sent ? (
                  <span>{t('contact_sent')}</span>
              ) : status === 'sending' ? (
                  <span>{MSG.sending[lang]}</span>
              ) : (
                  <>
                    <span>{t('contact_submit')}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </>
              )}
            </button>

            {status === 'error'
                ? <p className={styles.note} style={{ color: '#c0392b' }}>{errMsg}</p>
                : <p className={styles.note}>{t('contact_note')}</p>}
          </div>

        </div>
      </section>
  )
}