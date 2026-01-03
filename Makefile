## -------------------------------------------------------------------- PROGRAMS

## (use := so it doesn't change later)
NPM := pnpm
NPX := $(NPM) dlx
GIT := git
CP := cp
RM := rm
ECHO := echo

LINTER := ${NPX} eslint
FORMATTER := ${NPX} prettier
TSC := ${NPX} tsc

## --------------------------------------------------- COMMAND LINE ARG DEFAULTS

## All of these can be overridden on the command line...
## (use ?= so the root makefile can override if desired)

## The directory to use as the root
root_dir ?= .

tsconfig ?= tsconfig.json
tsbuildinfo ?= .tsbuildinfo
coverage_report ?= junit.xml

platform ?= default
## TODO...
env ?= staging
feature_flags ?=

frozen_lockfile ?= --frozen-lockfile
build_args ?=
dev_args ?= --host
test_args ?= --passWithNoTests
lint_args ?= --ext "**/*.{html,js,jsx,ts,tsx,json,md,css}" ./src
fix_args ?= "**/*.{html,js,jsx,ts,tsx,json,md,css}" --ignore-unknown ./src
echo_arg ?=

node_modules:
	@${NPM} install $(frozen_lockfile)
# 	@${NPM} --filter @fx-audio-dev/* run build

dist:
	@${NPM} -r run build $(build_args)
	@${NPM} run build $(build_args)

## --------------------------------------------------------------------- TARGETS

.PHONY: install
install: node_modules

.PHONY: reinstall
reinstall: wipe install

.PHONY: build
build: dist

.PHONY: rebuild
rebuild: clean build

.PHONY: dev
dev: install
	@${NPM} run dev $(dev_args)

.PHONY: test
test: install
	@${NPM} run test $(test_args)

.PHONY: test.ui
test.ui: install
	@${NPM} run test $(test_args) --ui

.PHONY: lint
lint:
	@${NPM} run lint $(lint_args)

.PHONY: commit
commit:
	@${NPM} cm

.PHONY: commitlint
commitlint:
	@${NPX} commitlint --edit "$1"

.PHONY: lint-staged
lint-staged:
	@${NPM} lint-staged

.PHONY: push
push:
	@${GIT} push

.PHONY: clean
clean:
	@${NPM} -r run clean
	@${NPM} run clean

.PHONY: wipe
wipe: clean
	@${NPM} -r run wipe
	@${NPM} run wipe

## ----------------------------------------------------------------------- UTILS

## `make echo echo_arg=NPM` will print something like `npm` or `yarn` or `pnpm`
## to the terminal... i.e., use this to check any internal Makefile variables!
.PHONY: echo
echo:
	@${ECHO} ${${echo_arg}}
