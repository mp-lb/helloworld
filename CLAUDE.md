<!-- Standard -->
## Agent context

Shared agent instructions live in `context/`. `context/index.md` explicitly imports blocks with `@filename.md`, in order. Files that are not imported are not included.

Edit source blocks, not generated root files. To add a block, create it and add its import to the index. To remove one, remove the import and unused file. Keep rules short and specific to the actual project.

Run `zap task context-build` after changes. Review and commit the source changes together with `AGENTS.base.md`, `AGENTS.md`, and `CLAUDE.md`. Without personal additions, all three outputs should match. Missing shared imports are errors, not optional omissions.

Keep private and machine-specific instructions out of committed context. The compiler supports explicit extra context paths for a local working copy; never commit those additions. `zap task context-copy` restores the root agent files from the shared base.

Extensions are documented at `extensions/<extension>/README.md` in the FSS Stack source (read with `fm read extensions/<extension>/README.md --store mp-lb/fssstack`). Each extension owns its context and other payloads. When installing one, copy its context payload, adapt it to the project, add the import once, and rebuild. Merge updates into existing customized blocks instead of overwriting them.
# HelloWorld

HelloWorld is an app all about unicorns.

## Project conventions

- Keep the project local-only; do not configure cloud resources, deployments, or external provider accounts.
- Follow the audit process in `audit.md` when an audit is requested.
## Development

Use Zapper for processes and tasks: `zap status`, `zap up`, `zap logs <service> --no-follow`, and `zap task <task>`. Inspect the existing stack before starting another copy. Services and tasks that need environment variables must receive Zapper's resolved environment.

Keep service names, dynamic ports and task commands in `zap.yaml`; do not hardcode development ports. Non-secret defaults live in `.env.local`; secrets belong in ignored `.env` or the configured secret source. Never put secret values in context.

The canonical tool versions are `.node-version` and `package.json#packageManager`; preserve them when changing local tooling or CI.
## Validation

Run `zap task check` for lint and typechecking, `zap task test` for relevant tests, and `zap task build` for build-sensitive changes. Run focused checks where the project provides them, and report any checks that could not run.

When applications or extensions are added, update this block with their actual validation tasks and boundaries. Do not invent task names or claim that a build proves runtime behavior.
## Scripts

Write project scripts in TypeScript in the package that owns the behaviour, or `packages/scripts` when there is no natural owner, and include them in normal lint and typecheck checks. Expose each script as a thin Zap task that invokes it with `tsx` (for example, `zap t somemigration` runs `packages/scripts/somemigration.ts`); keep CI callers aligned when moving scripts.
## Documentation

Keep HelloWorld-specific documents under `docs/`. This project has no dedicated Forum store or sync configuration. The historical `forum.yaml` shared-doc mappings have been removed.

Read shared standards with `fm read <file>.md --store mp-lb/dev` (list them with `fm ls --store mp-lb/dev`). Read shared extensions with `fm read extensions/<extension>/README.md --store mp-lb/fssstack` (list them with `fm ls extensions --store mp-lb/fssstack`).

For alignment audits, read root `audit.md`. Extension instructions and payloads live at `extensions/<extension>/README.md` and `extensions/<extension>/context/` in `mp-lb/fssstack`.
## Delivery

This reference project is local-only and has no application deployment or package publication workflow. Internal workspace packages should remain `private: true`.

<!-- Project types -->
## Frontend

Use the UI framework and component library configured in the frontend package. For shadcn/ui frontends, add components from that package's directory with the shadcn CLI and reuse the existing utilities, preset and theme. Do not assume the frontend is named `apps/frontend`.

Keep components focused, reuse form schemas and existing loading/error patterns, and validate the affected frontend through its configured Zap tasks.
## Backend

Keep application configuration at the app boundary and pass shared dependencies into packages. Reuse domain schemas rather than duplicating validation between API and UI. For tRPC backends, enforce authorization in procedures and test important behavior at the API boundary. Adapt this block to the selected backend and actual schema/package ownership.

<!-- MapLab augmentations -->
## MapLab workflow

Commit completed changes promptly, then use follow-up commits for fixes. Commit only your own changes; unrelated edits are normal and do not block work. Follow explicit project/user push preferences, and establish the preference once if unknown. Do not assume a push is harmless: it may trigger delivery.

Use Berth for project work and tasks; use `berth project list` and built-in help to locate the relevant project. Keep locally developed CLI tools built and linked after changing them. Run environment-dependent work through the project's Zap tasks.
## MapLab standards

Read relevant shared standards on demand with `fm read <file>.md --store mp-lb/dev`; list them with `fm ls --store mp-lb/dev`. Read capability setup at `fm read extensions/<extension>/README.md --store mp-lb/fssstack` and MapLab additions from `mp-lb/augmentations`.

Keep code focused and well organized, reuse domain schemas and shared components, and prefer sentence case for product copy and documentation. Follow project-specific architecture and validation policies. Document the project's actual Forum store/sync mapping in its documentation block; a project without a dedicated store does not need sync configuration.
## Code style

- Use PascalCase for components
- Files should have 1 export, and should be named the same. E.g. MyComponent lives in MyComponent.tsx
- Use camelCase for constants, functions, mongo collections
- Use train_case for typed strings
- File routers are an exception
- Generally 1 function/class per file

### Functional decomposition

Good functional decomposition is essential. This applies to react components, hooks, backend functions. Continuously abstract and centralise important code. Functions should be small and "do one thing".

### Code organization

Maintain an extreme approach to code organization. Functions/components should never be large or complex. Generally every function should have it's own file. Those files should be well organised. Continuously break down programs and organise files so that it's always crystal clear what modules relate to each other. You have permission to do this at all times. Flag concerns with the developer if unsure.

Take extra care when organizing tests.

### Tech debt

In general, follow the boy scout principle. But if you come across tech debt that's too big to address, add a .md doc to docs/tech-debt and raise it with the user.
## MapLab toolchain

Use mise to select the project's Node and pnpm versions from `.node-version` and `package.json#packageManager`. Do not duplicate version pins in mise configuration. Run `mise trust` and `mise install` when setting up a checkout; use an activated shell or `mise exec -- zap ...` so tasks inherit the selected tools. Zapper remains the task/process runner.

Prefer the installed tools' built-in help and verify authentication when needed; do not assume every cloud service is authenticated. Keep local CLI commands linked to the intended local build.
