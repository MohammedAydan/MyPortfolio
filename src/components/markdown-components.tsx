import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Components } from "react-markdown";


export const markdownComponents: Components = {
    // Headings with proper shadcn theming
    h1: ({ children, className, ...props }) => (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                "text-foreground",
                "mt-8 mb-6 first:mt-0",
                "border-b border-border pb-2",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    ),

    h2: ({ children, className, ...props }) => (
        <h2
            className={cn(
                "scroll-m-20 text-3xl font-semibold tracking-tight",
                "text-foreground",
                "mt-8 mb-4 first:mt-0",
                "border-b border-border pb-2",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    ),

    h3: ({ children, className, ...props }) => (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                "text-foreground",
                "mt-6 mb-3 first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    ),

    h4: ({ children, className, ...props }) => (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                "text-foreground",
                "mt-5 mb-2 first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h4>
    ),

    h5: ({ children, className, ...props }) => (
        <h5
            className={cn(
                "scroll-m-20 text-lg font-medium",
                "text-foreground",
                "mt-4 mb-2 first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h5>
    ),

    h6: ({ children, className, ...props }) => (
        <h6
            className={cn(
                "scroll-m-20 text-base font-medium",
                "text-foreground",
                "mt-3 mb-2 first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h6>
    ),

    // Paragraph with proper text color
    p: ({ children, className, ...props }) => (
        <p
            className={cn(
                "leading-7 text-foreground",
                "[&:not(:first-child)]:mt-6 mb-4",
                className
            )}
            {...props}
        >
            {children}
        </p>
    ),

    // Enhanced anchor with hover states
    a: ({ href = "#", children, className, ...props }) => {
        const isExternal = href.startsWith("http");
        const isSafe = isExternal || href.startsWith("/");

        return (
            <Link
                href={isSafe ? href : "#"}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer nofollow" : undefined}
                className={cn(
                    "text-primary underline underline-offset-4",
                    "hover:text-primary/80 transition-colors",
                    "break-words font-medium",
                    className
                )}
                {...props}
            >
                {children}
            </Link>
        );
    },

    // Lists with proper spacing and colors
    ul: ({ children, className, ...props }) => (
        <ul
            className={cn(
                "my-6 ml-6 list-disc text-foreground",
                "[&>li]:mt-2",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    ),

    ol: ({ children, className, ...props }) => (
        <ol
            className={cn(
                "my-6 ml-6 list-decimal text-foreground",
                "[&>li]:mt-2",
                className
            )}
            {...props}
        >
            {children}
        </ol>
    ),

    li: ({ children, className, ...props }) => (
        <li
            className={cn("leading-7", className)}
            {...props}
        >
            {children}
        </li>
    ),

    // Enhanced blockquote
    blockquote: ({ children, className, ...props }) => (
        <blockquote
            className={cn(
                "mt-6 border-l-4 border-primary pl-6 italic",
                "text-muted-foreground bg-muted/50 py-2 rounded-r-md",
                className
            )}
            {...props}
        >
            {children}
        </blockquote>
    ),

    // Inline code with proper theming
    code: ({ children, className, ...props }) => (
        <code
            className={cn(
                "relative rounded-md bg-muted px-[0.4rem] py-[0.2rem]",
                "font-mono text-sm font-medium text-foreground",
                "before:content-[''] after:content-['']",
                className
            )}
            {...props}
        >
            {children}
        </code>
    ),

    // Code block with syntax highlighting support
    pre: ({ children, className, ...props }) => (
        <div className="relative my-6">
            <pre
                className={cn(
                    "overflow-x-auto rounded-lg border border-border",
                    "bg-muted p-4 font-mono text-sm",
                    "text-foreground",
                    "[&>code]:bg-transparent [&>code]:p-0",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    ),

    // Enhanced images
    img: ({ className, alt, ...props }) => (
        <div className="my-6">
            <img
                {...props}
                loading="lazy"
                className={cn(
                    "rounded-lg border border-border max-w-full h-auto",
                    "shadow-sm hover:shadow-md transition-shadow",
                    className
                )}
                alt={alt || ""}
            />
        </div>
    ),

    // Horizontal rule
    hr: ({ className, ...props }) => (
        <hr
            className={cn("my-8 border-border", className)}
            {...props}
        />
    ),

    // Enhanced tables
    table: ({ children, className, ...props }) => (
        <div className="my-6 w-full overflow-y-auto">
            <table
                className={cn(
                    "w-full caption-bottom text-sm border-collapse",
                    "border border-border rounded-md",
                    className
                )}
                {...props}
            >
                {children}
            </table>
        </div>
    ),

    thead: ({ children, className, ...props }) => (
        <thead
            className={cn(
                "bg-muted/50 [&_tr]:border-b [&_tr]:border-border",
                className
            )}
            {...props}
        >
            {children}
        </thead>
    ),

    tbody: ({ children, className, ...props }) => (
        <tbody
            className={cn(
                "[&_tr:last-child]:border-0 [&_tr]:border-b [&_tr]:border-border",
                className
            )}
            {...props}
        >
            {children}
        </tbody>
    ),

    tr: ({ children, className, ...props }) => (
        <tr
            className={cn(
                "border-b border-border transition-colors",
                "hover:bg-muted/50 data-[state=selected]:bg-muted",
                className
            )}
            {...props}
        >
            {children}
        </tr>
    ),

    th: ({ children, className, ...props }) => (
        <th
            className={cn(
                "h-12 px-4 text-left align-middle font-semibold",
                "text-foreground [&:has([role=checkbox])]:pr-0",
                className
            )}
            {...props}
        >
            {children}
        </th>
    ),

    td: ({ children, className, ...props }) => (
        <td
            className={cn(
                "p-4 align-middle text-foreground",
                "[&:has([role=checkbox])]:pr-0",
                className
            )}
            {...props}
        >
            {children}
        </td>
    ),

    // Details & Summary with animations
    details: ({ children, className, ...props }) => (
        <details
            className={cn(
                "rounded-lg border border-border bg-card p-4 my-4",
                "group [&[open]]:bg-muted/20",
                className
            )}
            {...props}
        >
            {children}
        </details>
    ),

    summary: ({ children, className, ...props }) => (
        <summary
            className={cn(
                "cursor-pointer font-semibold text-foreground",
                "hover:text-primary transition-colors",
                "marker:text-primary group-open:marker:rotate-90",
                "marker:transition-transform",
                className
            )}
            {...props}
        >
            {children}
        </summary>
    ),

    // Text formatting
    em: ({ children, className, ...props }) => (
        <em
            className={cn("italic text-foreground", className)}
            {...props}
        >
            {children}
        </em>
    ),

    strong: ({ children, className, ...props }) => (
        <strong
            className={cn("font-semibold text-foreground", className)}
            {...props}
        >
            {children}
        </strong>
    ),

    // Line break
    br: ({ className, ...props }) => (
        <br className={className} {...props} />
    ),

    // Strikethrough
    del: ({ children, className, ...props }) => (
        <del
            className={cn("line-through text-muted-foreground", className)}
            {...props}
        >
            {children}
        </del>
    ),

    // Additional elements
    div: ({ children, className, ...props }) => (
        <div
            className={cn("my-2", className)}
            {...props}
        >
            {children}
        </div>
    ),

    mark: ({ children, className, ...props }) => (
        <mark
            className={cn(
                "bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-200",
                "px-1 py-0.5 rounded font-medium",
                className
            )}
            {...props}
        >
            {children}
        </mark>
    ),

    sup: ({ children, className, ...props }) => (
        <sup
            className={cn("align-super text-xs text-foreground", className)}
            {...props}
        >
            {children}
        </sup>
    ),

    sub: ({ children, className, ...props }) => (
        <sub
            className={cn("align-sub text-xs text-foreground", className)}
            {...props}
        >
            {children}
        </sub>
    ),

    kbd: ({ children, className, ...props }) => (
        <kbd
            className={cn(
                "pointer-events-none inline-flex h-5 select-none items-center gap-1",
                "rounded border border-border bg-muted px-1.5 font-mono text-[10px]",
                "font-medium text-muted-foreground opacity-100",
                className
            )}
            {...props}
        >
            {children}
        </kbd>
    ),

    address: ({ children, className, ...props }) => (
        <address
            className={cn("not-italic text-foreground mb-4", className)}
            {...props}
        >
            {children}
        </address>
    ),

    figure: ({ children, className, ...props }) => (
        <figure
            className={cn("my-6 text-center", className)}
            {...props}
        >
            {children}
        </figure>
    ),

    figcaption: ({ children, className, ...props }) => (
        <figcaption
            className={cn(
                "text-sm text-muted-foreground text-center mt-2 italic",
                className
            )}
            {...props}
        >
            {children}
        </figcaption>
    ),

    time: ({ children, className, ...props }) => (
        <time
            className={cn("text-muted-foreground", className)}
            {...props}
        >
            {children}
        </time>
    ),

    small: ({ children, className, ...props }) => (
        <small
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </small>
    ),

    // Additional semantic elements
    article: ({ children, className, ...props }) => (
        <article
            className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}
            {...props}
        >
            {children}
        </article>
    ),

    section: ({ children, className, ...props }) => (
        <section
            className={cn("mb-8", className)}
            {...props}
        >
            {children}
        </section>
    ),

    aside: ({ children, className, ...props }) => (
        <aside
            className={cn(
                "border-l-4 border-primary bg-muted/50 p-4 my-4 rounded-r-md",
                className
            )}
            {...props}
        >
            {children}
        </aside>
    ),

    nav: ({ children, className, ...props }) => (
        <nav
            className={cn("mb-4", className)}
            {...props}
        >
            {children}
        </nav>
    ),

    header: ({ children, className, ...props }) => (
        <header
            className={cn("mb-6 border-b border-border pb-4", className)}
            {...props}
        >
            {children}
        </header>
    ),

    footer: ({ children, className, ...props }) => (
        <footer
            className={cn("mt-8 border-t border-border pt-4 text-muted-foreground", className)}
            {...props}
        >
            {children}
        </footer>
    ),
};