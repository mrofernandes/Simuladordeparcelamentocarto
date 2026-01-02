import { ArrowLeft } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

export function MobileHeader({ title, onBack, currentStep, totalSteps }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background">
      {/* Status Bar */}
      <div className="h-[52px] flex items-center justify-between px-6">
        <span className="text-foreground">9:30</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 text-foreground">📶</div>
          <div className="w-4 h-4 text-foreground">📡</div>
          <div className="w-4 h-4 text-foreground">🔋</div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 bg-secondary rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-6 text-foreground" />
          </button>
        ) : (
          <div className="w-10" />
        )}
        
        <h3 className="flex-1 text-center px-4">{title}</h3>
        
        <div className="w-10" />
      </div>
      
      {/* Progress Bar */}
      {currentStep && totalSteps && (
        <div className="flex gap-2 px-6 pb-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-lg transition-colors ${
                index < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
