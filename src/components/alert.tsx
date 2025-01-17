import { Button, buttonVariants } from "@/components/ui/button";
import {
  CircleAlert,
  CircleCheck,
  Info,
  LucideIcon,
  TriangleAlert,
  X,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "z-[100] w-full max-w-lg rounded-lg border p-4 shadow-lg shadow-black/5",
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        destructive: "border-red-500/30 text-red-600 bg-red-500/10",
        info: "border-blue-500/30 text-blue-600 bg-blue-500/10",
        warning: "border-amber-500/30 text-amber-600 bg-amber-500/10",
        success: "border-green-500/30 text-green-600 bg-green-500/10",
      },
      size: {
        default: "p-4",
        sm: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type AlertVariants = VariantProps<typeof alertVariants>;
type Variant = NonNullable<AlertVariants["variant"]>;

type IconType = {
  variant: Variant;
  icon: LucideIcon;
  color: string;
};

const iconType: IconType[] = [
  {
    variant: "default",
    icon: Info,
    color: "text-muted-foreground",
  },
  {
    variant: "info",
    icon: Info,
    color: "text-blue-500",
  },
  {
    variant: "destructive",
    icon: CircleAlert,
    color: "text-destructive",
  },
  {
    variant: "warning",
    icon: TriangleAlert,
    color: "text-amber-500",
  },
  {
    variant: "success",
    icon: CircleCheck,
    color: "text-green-500",
  },
];

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertVariants {
  showDismissButton?: boolean;
  dismiss?: (state: boolean) => void;
}

export function Alert({
  className,
  variant,
  children,
  showDismissButton = false,
  dismiss,
  ...props
}: AlertProps) {
  const iconConfig =
    iconType.find((icon) => icon.variant === variant) || iconType[0];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      <div className="flex gap-2">
        <div className="flex grow gap-3">
          <iconConfig.icon
            className={cn("mt-0.5 shrink-0", iconConfig.color)}
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <div className="flex grow flex-col gap-1">{children}</div>
          {showDismissButton && (
            <Button
              variant="ghost"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
              aria-label="Close notification"
              onClick={() => {
                dismiss?.(false);
              }}
            >
              <X
                size={16}
                strokeWidth={2}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm font-medium", className)} {...props} />;
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs", className)} {...props} />;
}

export function AlertAction({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return (
    <div className="mt-2 flex gap-2">
      <Button size="sm" {...props} className={cn(className)} />
    </div>
  );
}
