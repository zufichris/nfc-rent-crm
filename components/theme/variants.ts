export type Variant = "default" | "destructive" | "success" | "info" | "outline" | "link" | "ghost" | "secondary" | "warning"


export function getVariant(variant: Variant, options?: {
    invert?: boolean
}) {
    const statusVariants: Record<Variant, string> = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        info: "bg-info text-info-foreground hover:bg-info/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        success: "bg-success text-success-foreground hover:bg-success/90"
    }

    const statusVariantsInvert: Record<Variant, string> = {
        default: "bg-primary/30 text-primary hover:bg-primary/40 transition-colors",
        destructive: "bg-destructive/30 text-destructive hover:bg-destructive/40 transition-colors",
        outline: "bg-outline/30 text-outline hover:bg-outline/40 transition-colors",
        secondary: "bg-secondary/30 text-secondary hover:bg-secondary/40 transition-colors",
        ghost: "bg-ghost/30 text-ghost hover:bg-ghost/40 transition-colors",
        link: "bg-link/30 text-link hover:bg-link/40 transition-colors",
        info: "bg-info/30 text-info hover:bg-info/40 transition-colors",
        warning: "bg-warning/30 text-warning hover:bg-warning/40 transition-colors",
        success: "bg-success/30 text-success hover:bg-success/40 transition-colors"
    }
    return options?.invert ? statusVariantsInvert[variant] : statusVariants[variant]
}
export function getVariants(): Record<Variant, string> {
    const variants: Variant[] = ["default", "destructive", "ghost", "info", "link", "outline", "secondary", "success", "warning"]
    return variants.reduce((acc, variant) => {
        acc[variant] = getVariant(variant)
        return acc
    }, {} as Record<Variant, string>)
}