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

export interface NewsView {
	id: string
	cat: string
	title: string
	text: string
	date: string
}

export interface StoryView {
	id: string
	badge: string
	name: string
	biz: string
	quote: string
}

export interface CityView {
	id: string
	code: string
	isMain: boolean
	name: Record<Lang, string>
	region: Record<Lang, string>
}

export interface SiteContent {
	translations: Record<Lang, Record<string, string>>
	products: Record<Lang, ProductView[]>
	categories: Record<Lang, CategoryView[]>
	news: Record<Lang, NewsView[]>
	stories: Record<Lang, StoryView[]>
	cities: CityView[]
}
