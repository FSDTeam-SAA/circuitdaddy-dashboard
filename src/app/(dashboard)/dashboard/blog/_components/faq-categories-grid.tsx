import { Card, CardContent } from '@/components/ui/card'

interface Category {
  id: string
  name: string
  count: number
}

const categories: Category[] = [
  { id: '1', name: 'Getting Started', count: 8 },
  { id: '2', name: 'Badges & Levels', count: 12 },
  { id: '3', name: 'Pricing & Payments', count: 6 },
  { id: '4', name: 'Client Relations', count: 9 },
  { id: '5', name: 'Platform Features', count: 15 },
  { id: '6', name: 'Account Management', count: 7 },
]

export default function FAQCategoriesGrid() {
  return (
    <div className="mb-16">
      <h2 className="text-base font-medium text-[#282828] text-[18px] mb-8">FAQ Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="bg-card border-border hover:border-border/80 transition-all cursor-pointer"
          >
            <CardContent className="p-6">
              <h2 className="text-sm text-[#6B7280] mb-2">{category.name}</h2>
              <p className="text-[18px] font-medium text-[#282828] ">
                {category.count} {category.count === 1 ? 'article' : 'articles'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
