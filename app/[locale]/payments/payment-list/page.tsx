import { StatCard } from "@/components/misc/stat-card"
import { CreditCard, CheckCircle, AlertTriangle, RefreshCcw } from "lucide-react"
import { Currencies } from "@/types/pricing"
import { PaymentStatus } from "@/types/payment"
import { PaymentTable } from "@/components/payment/paymet-table/table"

export default async function PaymentsListPage({params }: Readonly<{ params: Promise<{ search: Record<string, string> }> }>) {
    const search = await params

    const payments = [
        {
            id: "1",
            booking: {
                id: "1",
                user: { fullName: "John Smith" },
                car: { name: "Ferrari 488 GTB" },
            },
            amount: 6000,
            currency: Currencies.USD,
            status: PaymentStatus.PAID,
            paymentMethod: "Credit Card",
            paidAt: new Date("2023-08-14"),
            isCrypto: false,
            isActive: true,
            isDeleted: false,
        },
        {
            id: "2",
            booking: {
                id: "2",
                user: { fullName: "Emma Johnson" },
                car: { name: "Lamborghini Huracán" },
            },
            amount: 10500,
            currency: Currencies.USD,
            status: PaymentStatus.PENDING,
            paymentMethod: "Bank Transfer",
            isCrypto: false,
            isActive: true,
            isDeleted: false,
        },
        {
            id: "3",
            booking: {
                id: "3",
                user: { fullName: "Michael Brown" },
                car: { name: "Tesla Model S" },
            },
            amount: 3200,
            currency: Currencies.EUR,
            status: PaymentStatus.PAID,
            paymentMethod: "PayPal",
            paidAt: new Date("2023-08-09"),
            isCrypto: false,
            isActive: true,
            isDeleted: false,
        },
        {
            id: "4",
            booking: {
                id: "4",
                user: { fullName: "Sophia Williams" },
                car: { name: "Rolls-Royce Phantom" },
            },
            amount: 14000,
            currency: Currencies.ETH,
            status: PaymentStatus.PENDING_CAPTURE,
            paymentMethod: "Cryptocurrency",
            isCrypto: true,
            cryptoAddress: "0x1234...5678",
            isActive: true,
            isDeleted: false,
        },
    ]

    const totalPayments = payments.length
    const paidPayments = payments.filter((payment) => payment.status === PaymentStatus.PAID).length
    const pendingPayments = payments.filter(
        (payment) => payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.PENDING_CAPTURE,
    ).length
    const totalRevenue = payments
        .filter((payment) => payment.status === PaymentStatus.PAID)
        .reduce((sum, payment) => sum + payment.amount, 0)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Payments"
                    subtitle="All Transactions"
                    icon={<CreditCard />}
                    variant="info"
                    value={totalPayments}
                />
                <StatCard
                    title="Paid"
                    subtitle="Completed Payments"
                    icon={<CheckCircle />}
                    variant="success"
                    value={paidPayments}
                />
                <StatCard
                    title="Pending"
                    subtitle="Awaiting Payment"
                    icon={<AlertTriangle />}
                    variant="warning"
                    value={pendingPayments}
                />
                <StatCard
                    title="Revenue"
                    subtitle="Total Revenue"
                    icon={<RefreshCcw />}
                    variant="default"
                    value={`$${totalRevenue.toLocaleString()}`}
                />
            </div>
            <PaymentTable
                payments={payments}
                total={payments.length}
                page={1}
                limit={ 10}
                activeFilters={search}
            />
        </>
    )
}
