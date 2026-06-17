export type Lang = 'ru' | 'ky' | 'en'

export interface Product {
	id: string
	cat: string
	nameKey: string
	badgeKey: string
	descKey: string
	amountKey: string
	coverKey: string
	termKey: string
	gradient: string
	isGreen?: boolean
}

export interface City {
	id: string
	name: Record<string, string>
	region: Record<string, string>
	code: string
	isMain?: boolean // опциональное, т.к. есть не у всех
}

export interface Step {
	num: string
	title: string
	text: string
}

// --- Данные из Payload CMS (резолвнутые под текущую локаль) ---

// Блоки «паспорта продукта» — структура, которую собирают в админке.
export type PassportBlock =
	| { blockType: 'heading'; text?: string; id?: string }
	| { blockType: 'text'; text?: string; id?: string }
	| { blockType: 'rows'; items?: { label?: string; value?: string; id?: string }[]; id?: string }
	| {
			blockType: 'table'
			columns?: { header?: string; id?: string }[]
			data?: { cells?: { value?: string; id?: string }[]; id?: string }[]
			id?: string
	  }
	| { blockType: 'list'; items?: { text?: string; id?: string }[]; id?: string }
	| { blockType: 'note'; text?: string; id?: string }

export interface ProductView {
	id: string
	cats: string[]
	gradient: string
	isGreen: boolean
	name: string
	badge: string
	desc: string
	amount: string
	cover: string
	term: string
	passport: PassportBlock[] | null
}

export interface CategoryView {
	slug: string
	label: string
}

// Lexical rich-text (хранится как корневой JSON редактора).
export type RichText = { root: { children: unknown[]; [k: string]: unknown } } | null

// Блоки конструктора страницы (новости/истории). Резолвнуты под локаль,
// медиа уже приведены к URL — структура плоская и сериализуемая.
export type ContentBlock =
	| { type: 'heading'; text: string }
	| { type: 'richtext'; value: RichText }
	| { type: 'image'; url: string; caption: string; size: string }
	| { type: 'gallery'; images: { url: string; caption: string }[] }
	| { type: 'video'; url: string; file: string; caption: string }
	| { type: 'files'; items: { url: string; title: string }[] }
	| { type: 'quote'; text: string; author: string }
	| { type: 'button'; label: string; url: string }

export interface NewsView {
	id: string
	slug: string
	cat: string
	title: string
	text: string
	date: string
	cover: string // URL обложки ('' если не задана)
	content: ContentBlock[]
}

export interface StoryView {
	id: string
	slug: string
	badge: string
	name: string
	biz: string
	quote: string
	photo: string // URL фото ('' если не задано)
	content: ContentBlock[]
}

export interface CityView {
	id: string
	code: string
	isMain: boolean
	name: Record<Lang, string>
	region: Record<Lang, string>
	address: Record<Lang, string>
	hours: Record<Lang, string>
	phone: string
	email: string
	mapLink: string
	posX: number | null // позиция точки на карте, % по горизонтали
	posY: number | null // позиция точки на карте, % по вертикали
}

export interface PartnerView {
	id: string
	name: string
	type: 'bank' | 'org' | 'intl'
	logo: string // URL логотипа ('' если не задан)
	url: string
}

export interface MilestoneView {
	id: string
	year: number
	tag: string
	desc: string
}

export interface SocialLink {
	network: string
	url: string
}

// «Общие настройки» — резолвнуто под локаль (плоские строки).
export interface SettingsView {
	logo: string
	siteName: string
	phoneShort: string
	phone: string
	email: string
	address: string
	hours: string
	mapLink: string
	oldSiteUrl: string
	nbkrNotice: string
	floatingCtaText: string
	mapCoordsLabel: string
	socials: SocialLink[]
}

// «Цифры фонда» — единый источник чисел (не локализованы).
export interface StatsView {
	guaranteesCount: number
	guaranteesSum: number
	loansSum: number
	repayRate: number
	years: number
	branches: number
	partnersCount: number
	regionsCovered: number
}

// «Калькулятор» — параметры расчёта (не локализованы).
export interface CalculatorView {
	minAmount: number
	maxAmount: number
	stepAmount: number
	defaultAmount: number
	minTerm: number
	maxTerm: number
	stepTerm: number
	defaultTerm: number
	guaranteePct: number
	annualFeePct: number
	currencies: string[]
}

export interface SiteContent {
	translations: Record<Lang, Record<string, string>>
	products: Record<Lang, ProductView[]>
	categories: Record<Lang, CategoryView[]>
	news: Record<Lang, NewsView[]>
	stories: Record<Lang, StoryView[]>
	cities: CityView[]
	partners: PartnerView[]
	milestones: Record<Lang, MilestoneView[]>
	settings: Record<Lang, SettingsView>
	stats: StatsView
	calculator: CalculatorView
}
