import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react-dom-interactions";
import { cloneElement, useMemo, useState } from "react";
import { mergeRefs } from "react-merge-refs";

const Tooltip = ({ children, label, placement = "top" }) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([reference, children.ref]),
    [reference, children]
  );

  return (
    <div>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            className: "bg-zinc-900/90 px-2 py-1 rounded-sm text-slate-200",
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
