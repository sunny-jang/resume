
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\contract\ContractInfoBox.svelte generated by Svelte v3.55.1 */

    const file$5 = "src\\components\\contract\\ContractInfoBox.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each list as item}
    function create_each_block$2(ctx) {
    	let dl;
    	let dt;
    	let t0_value = /*item*/ ctx[2].label + "";
    	let t0;
    	let dd;
    	let a;
    	let t1_value = /*item*/ ctx[2].text + "";
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			dl = element("dl");
    			dt = element("dt");
    			t0 = text(t0_value);
    			dd = element("dd");
    			a = element("a");
    			t1 = text(t1_value);
    			attr_dev(dt, "class", "svelte-bw6z8f");
    			add_location(dt, file$5, 9, 8, 171);
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[2].href);
    			add_location(a, file$5, 10, 12, 206);
    			add_location(dd, file$5, 10, 8, 202);
    			attr_dev(dl, "class", "svelte-bw6z8f");
    			add_location(dl, file$5, 8, 8, 157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dl, anchor);
    			append_dev(dl, dt);
    			append_dev(dt, t0);
    			append_dev(dl, dd);
    			append_dev(dd, a);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list*/ 2 && t0_value !== (t0_value = /*item*/ ctx[2].label + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*list*/ 2 && t1_value !== (t1_value = /*item*/ ctx[2].text + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*list*/ 2 && a_href_value !== (a_href_value = /*item*/ ctx[2].href)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dl);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(8:4) {#each list as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let h3;
    	let t0;
    	let t1;
    	let each_value = /*list*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h3, file$5, 6, 4, 105);
    			attr_dev(div, "class", "contract_info_box svelte-bw6z8f");
    			add_location(div, file$5, 5, 0, 68);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (dirty & /*list*/ 2) {
    				each_value = /*list*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContractInfoBox', slots, []);
    	let { title } = $$props;
    	let { list } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<ContractInfoBox> was created without expected prop 'title'");
    		}

    		if (list === undefined && !('list' in $$props || $$self.$$.bound[$$self.$$.props['list']])) {
    			console.warn("<ContractInfoBox> was created without expected prop 'list'");
    		}
    	});

    	const writable_props = ['title', 'list'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContractInfoBox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('list' in $$props) $$invalidate(1, list = $$props.list);
    	};

    	$$self.$capture_state = () => ({ title, list });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('list' in $$props) $$invalidate(1, list = $$props.list);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, list];
    }

    class ContractInfoBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0, list: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContractInfoBox",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get title() {
    		throw new Error("<ContractInfoBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ContractInfoBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get list() {
    		throw new Error("<ContractInfoBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set list(value) {
    		throw new Error("<ContractInfoBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\header\BigHeader.svelte generated by Svelte v3.55.1 */

    const file$4 = "src\\components\\header\\BigHeader.svelte";

    function create_fragment$4(ctx) {
    	let h2;
    	let t;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(h2, "class", "svelte-1k1xy7l");
    			add_location(h2, file$4, 4, 0, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BigHeader', slots, []);
    	let { title } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<BigHeader> was created without expected prop 'title'");
    		}
    	});

    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BigHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ title });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title];
    }

    class BigHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BigHeader",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get title() {
    		throw new Error("<BigHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<BigHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\introduction\Introduction.svelte generated by Svelte v3.55.1 */
    const file$3 = "src\\components\\introduction\\Introduction.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let bigheader;
    	let t0;
    	let span1;
    	let t1;
    	let span0;
    	let t3;
    	let t4;
    	let div0;
    	let current;

    	bigheader = new BigHeader({
    			props: { title: "INTRODUCTION" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(bigheader.$$.fragment);
    			t0 = space();
    			span1 = element("span");
    			t1 = text("저는 ");
    			span0 = element("span");
    			span0.textContent = "______";
    			t3 = text(" 엔지니어입니다.");
    			t4 = space();
    			div0 = element("div");
    			add_location(span0, file$3, 8, 30, 206);
    			attr_dev(span1, "class", "who_i_am svelte-186dvff");
    			add_location(span1, file$3, 8, 4, 180);
    			attr_dev(div0, "class", "introduction_text svelte-186dvff");
    			add_location(div0, file$3, 9, 4, 247);
    			attr_dev(div1, "class", "introduction");
    			add_location(div1, file$3, 6, 0, 108);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(bigheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, span1);
    			append_dev(span1, t1);
    			append_dev(span1, span0);
    			append_dev(span1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			div0.innerHTML = /*introduction*/ ctx[0];
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*introduction*/ 1) div0.innerHTML = /*introduction*/ ctx[0];		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bigheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bigheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(bigheader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Introduction', slots, []);
    	let { introduction } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (introduction === undefined && !('introduction' in $$props || $$self.$$.bound[$$self.$$.props['introduction']])) {
    			console.warn("<Introduction> was created without expected prop 'introduction'");
    		}
    	});

    	const writable_props = ['introduction'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Introduction> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('introduction' in $$props) $$invalidate(0, introduction = $$props.introduction);
    	};

    	$$self.$capture_state = () => ({ BigHeader, introduction });

    	$$self.$inject_state = $$props => {
    		if ('introduction' in $$props) $$invalidate(0, introduction = $$props.introduction);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [introduction];
    }

    class Introduction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { introduction: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Introduction",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get introduction() {
    		throw new Error("<Introduction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set introduction(value) {
    		throw new Error("<Introduction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\content\Projects.svelte generated by Svelte v3.55.1 */
    const file$2 = "src\\components\\content\\Projects.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (6:0) {#if title}
    function create_if_block_1(ctx) {
    	let bigheader;
    	let current;

    	bigheader = new BigHeader({
    			props: { title: /*title*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(bigheader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bigheader, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const bigheader_changes = {};
    			if (dirty & /*title*/ 1) bigheader_changes.title = /*title*/ ctx[0];
    			bigheader.$set(bigheader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bigheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bigheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bigheader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(6:0) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (19:8) {#if project.description}
    function create_if_block(ctx) {
    	let p;
    	let raw_value = /*project*/ ctx[2].description + "";

    	const block = {
    		c: function create() {
    			p = element("p");
    			attr_dev(p, "class", "svelte-12acamj");
    			add_location(p, file$2, 19, 12, 544);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 2 && raw_value !== (raw_value = /*project*/ ctx[2].description + "")) p.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(19:8) {#if project.description}",
    		ctx
    	});

    	return block;
    }

    // (9:0) {#each projects as project}
    function create_each_block$1(ctx) {
    	let div1;
    	let h5;
    	let t0_value = /*project*/ ctx[2].projectTitle + "";
    	let t0;
    	let t1;
    	let div0;
    	let span0;
    	let t2;
    	let t3_value = /*project*/ ctx[2].period + "";
    	let t3;
    	let t4;
    	let t5;
    	let span1;
    	let t7;
    	let span2;
    	let t8_value = /*project*/ ctx[2].projectGroup + "";
    	let t8;
    	let t9;
    	let t10;
    	let if_block = /*project*/ ctx[2].description && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h5 = element("h5");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			span0 = element("span");
    			t2 = text("(");
    			t3 = text(t3_value);
    			t4 = text(")");
    			t5 = space();
    			span1 = element("span");
    			span1.textContent = "-";
    			t7 = space();
    			span2 = element("span");
    			t8 = text(t8_value);
    			t9 = space();
    			if (if_block) if_block.c();
    			t10 = space();
    			attr_dev(span0, "class", "svelte-12acamj");
    			add_location(span0, file$2, 13, 16, 342);
    			attr_dev(span1, "class", "svelte-12acamj");
    			add_location(span1, file$2, 14, 16, 391);
    			attr_dev(span2, "class", "svelte-12acamj");
    			add_location(span2, file$2, 15, 16, 425);
    			attr_dev(div0, "class", "project_detail svelte-12acamj");
    			add_location(div0, file$2, 12, 12, 296);
    			attr_dev(h5, "class", "svelte-12acamj");
    			add_location(h5, file$2, 10, 8, 242);
    			attr_dev(div1, "class", "project_info svelte-12acamj");
    			add_location(div1, file$2, 9, 4, 206);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h5);
    			append_dev(h5, t0);
    			append_dev(h5, t1);
    			append_dev(h5, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(span0, t4);
    			append_dev(div0, t5);
    			append_dev(div0, span1);
    			append_dev(div0, t7);
    			append_dev(div0, span2);
    			append_dev(span2, t8);
    			append_dev(div1, t9);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t10);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 2 && t0_value !== (t0_value = /*project*/ ctx[2].projectTitle + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*projects*/ 2 && t3_value !== (t3_value = /*project*/ ctx[2].period + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*projects*/ 2 && t8_value !== (t8_value = /*project*/ ctx[2].projectGroup + "")) set_data_dev(t8, t8_value);

    			if (/*project*/ ctx[2].description) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, t10);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:0) {#each projects as project}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t;
    	let each_1_anchor;
    	let current;
    	let if_block = /*title*/ ctx[0] && create_if_block_1(ctx);
    	let each_value = /*projects*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*title*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*projects*/ 2) {
    				each_value = /*projects*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	let { title } = $$props;
    	let { projects = [] } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Projects> was created without expected prop 'title'");
    		}
    	});

    	const writable_props = ['title', 'projects'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('projects' in $$props) $$invalidate(1, projects = $$props.projects);
    	};

    	$$self.$capture_state = () => ({ BigHeader, title, projects });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('projects' in $$props) $$invalidate(1, projects = $$props.projects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, projects];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { title: 0, projects: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get title() {
    		throw new Error("<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get projects() {
    		throw new Error("<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\content\Experiences.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\components\\content\\Experiences.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (21:20) {#each experience.detailList as detail}
    function create_each_block_2(ctx) {
    	let li;
    	let t_value = /*detail*/ ctx[8].content + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "detail svelte-1t1l05s");
    			add_location(li, file$1, 21, 24, 759);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t_value !== (t_value = /*detail*/ ctx[8].content + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(21:20) {#each experience.detailList as detail}",
    		ctx
    	});

    	return block;
    }

    // (25:28) {#each experience.techSkils as skills}
    function create_each_block_1(ctx) {
    	let span;
    	let t_value = /*skills*/ ctx[5] + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "skil svelte-1t1l05s");
    			add_location(span, file$1, 25, 32, 973);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t_value !== (t_value = /*skills*/ ctx[5] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(25:28) {#each experience.techSkils as skills}",
    		ctx
    	});

    	return block;
    }

    // (11:4) {#each item.workList as experience}
    function create_each_block(ctx) {
    	let div4;
    	let div3;
    	let div1;
    	let h4;
    	let t0_value = /*experience*/ ctx[2].companyName + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2_value = /*experience*/ ctx[2].period + "";
    	let t2;
    	let t3;
    	let div2;
    	let h5;
    	let t4_value = /*experience*/ ctx[2].description + "";
    	let t4;
    	let t5;
    	let ul;
    	let t6;
    	let li;
    	let t7;
    	let t8;
    	let each_value_2 = /*experience*/ ctx[2].detailList;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*experience*/ ctx[2].techSkils;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			h5 = element("h5");
    			t4 = text(t4_value);
    			t5 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();
    			li = element("li");
    			t7 = text("Tech Skills: \r\n                            ");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t8 = space();
    			attr_dev(h4, "class", "svelte-1t1l05s");
    			add_location(h4, file$1, 14, 20, 437);
    			add_location(div0, file$1, 15, 20, 492);
    			attr_dev(div1, "class", "content_left svelte-1t1l05s");
    			add_location(div1, file$1, 13, 16, 389);
    			attr_dev(h5, "class", "svelte-1t1l05s");
    			add_location(h5, file$1, 18, 20, 613);
    			add_location(li, file$1, 23, 24, 854);
    			add_location(ul, file$1, 19, 20, 668);
    			attr_dev(div2, "class", "content_right svelte-1t1l05s");
    			add_location(div2, file$1, 17, 16, 564);
    			attr_dev(div3, "class", "experience svelte-1t1l05s");
    			add_location(div3, file$1, 12, 12, 347);
    			attr_dev(div4, "class", "experience_projects svelte-1t1l05s");
    			add_location(div4, file$1, 11, 8, 300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, h4);
    			append_dev(h4, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, t2);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, h5);
    			append_dev(h5, t4);
    			append_dev(div2, t5);
    			append_dev(div2, ul);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul, null);
    			}

    			append_dev(ul, t6);
    			append_dev(ul, li);
    			append_dev(li, t7);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(li, null);
    			}

    			append_dev(div4, t8);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*experience*/ ctx[2].companyName + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*item*/ 1 && t2_value !== (t2_value = /*experience*/ ctx[2].period + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*item*/ 1 && t4_value !== (t4_value = /*experience*/ ctx[2].description + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*item*/ 1) {
    				each_value_2 = /*experience*/ ctx[2].detailList;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul, t6);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*item*/ 1) {
    				each_value_1 = /*experience*/ ctx[2].techSkils;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(li, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(11:4) {#each item.workList as experience}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let bigheader;
    	let t;
    	let div0;
    	let current;

    	bigheader = new BigHeader({
    			props: { title: /*title*/ ctx[1] },
    			$$inline: true
    		});

    	let each_value = /*item*/ ctx[0].workList;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(bigheader.$$.fragment);
    			t = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "content");
    			add_location(div0, file$1, 9, 4, 228);
    			attr_dev(div1, "class", "content_section");
    			add_location(div1, file$1, 7, 0, 160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(bigheader, div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const bigheader_changes = {};
    			if (dirty & /*title*/ 2) bigheader_changes.title = /*title*/ ctx[1];
    			bigheader.$set(bigheader_changes);

    			if (dirty & /*item*/ 1) {
    				each_value = /*item*/ ctx[0].workList;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bigheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bigheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(bigheader);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Experiences', slots, []);
    	let { item } = $$props;
    	let { title } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (item === undefined && !('item' in $$props || $$self.$$.bound[$$self.$$.props['item']])) {
    			console.warn("<Experiences> was created without expected prop 'item'");
    		}

    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Experiences> was created without expected prop 'title'");
    		}
    	});

    	const writable_props = ['item', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Experiences> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ BigHeader, Projects, item, title });

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item, title];
    }

    class Experiences extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { item: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Experiences",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get item() {
    		throw new Error("<Experiences>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Experiences>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Experiences>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Experiences>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\data\index.svelte generated by Svelte v3.55.1 */

    let name = '장은선';
    let engName = 'Sunny';
    let lastUpdated = '2023.01.13';

    let channels = [
    	{
    		label: 'Github',
    		href: 'https://github.com/sunny-jang',
    		text: 'https://github.com/sunny-jang'
    	},
    	{
    		label: 'Blog',
    		href: 'https://sunny-jang.tistory.com',
    		text: 'https://sunny-jang.tistory.com'
    	}
    ];

    let contract = [
    	{
    		label: 'Email',
    		text: 'esunbest@gmail.com'
    	}
    ];

    let introductionText = `
    안녕하세요. 4년차 프론트앤드 개발자 장은선입니다. </br></br>

    웹/앱 서비스의 프론트앤드 개발과 스타트업 개발자로서의 다양한 경험이 있습니다. React, javsScript, typeScript, Redux, SWR, Git 등을 사용하여 프로덕션 서비스를 설계 개발, 
    운영한 경험으로 확장성과 유지보수성이 높은 개발을 하기 위해 언제나 고민하고 있습니다. </br>
    프론트앤드 개발자로 다수의 프로젝트에 참여해 갖춘 업무처리속도와 다양한 플랫폼 기반의 UX개발 경험들은 제 강점중의 하나입니다.</br>
    신속한 서비스 제공과 안정화된 코드로 유저들에게 편리함과 신뢰할 수 있는 서비스의 경험을 남기기 위해 노력하고 있습니다.</br></br>

    새로운 기술에도 관심과 궁금증이 많아 다양한 개발 밋업에 참여하고, 개발그룹에서의 네트워킹과 토론을 즐깁니다.</br>
    언젠가 프론트 앤드 개발에 정점을 찍어 웹 개발에 관련 서적을 내고, 많은 사람들에게 지식을 전파할 수 있는 개발자가 되겠다는 목표가 있습니다. </br>
    이를 이루기 위해 꾸준한 공부를 하고, 웹개발을 배우는 동료가 있으면 제가 가진 지식으로 언제나 도움을 주려고 합니다.</br></br>

    서비스란, 사람들이 머무르고 계속 사용하고 싶은 프로그램을 제공하는 것이라고 생각합니다.</br>
    저의 다양한 경험들을 활용해 사랑받는 서비스를 개발해 지속적으로 성장해 나가고 싶습니다. </br>
`;

    let workSection = {
    	workList: [
    		{
    			companyName: '판도라티비',
    			period: '2021-07~ 재직 중',
    			description: '경제에 관심을 가지는 유저들의 블록체인 커뮤니티 web과 mobile 메인 프론트앤드 개발 담당',
    			detailList: [
    				{
    					content: '글로벌 IDO 중개 플랫폼 오픈 web3 서비스 운영 및 유지보수'
    				},
    				{
    					content: '사용자 Needs 에 맞는 사용성 개선과 신규 비즈니스 로직 구현'
    				},
    				{ content: '레거시 청산 및 기존 비즈니스 유지보수' },
    				{
    					content: '웹 서비스와 포맷이 맞지 않는 앱의 글쓰기에서 웹뷰에 CkEditor를 사용해 글쓰기 기능 통일'
    				},
    				{
    					content: 'typeScirpt, swr 도입으로 코드 프로젝트 퀄리티 개선'
    				}
    			],
    			techSkils: ['React', 'swr', 'redux-saga', 'less', 'javaScript', 'typeScript'],
    			projects: [
    				{
    					projectTitle: 'Cobak 블록체인 커뮤니티 운영/리뉴얼',
    					projectGroup: 'Pandora.TV',
    					period: '2021년 07월 - 진행 중',
    					description: `블록체인 커뮤니티 Cobak 운영 및 고도화

                        - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여
                        - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>
                        - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체
                        - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여
                        - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>
                    `
    				},
    				{
    					projectTitle: '뉴스속보/ 뉴스매체 커스텀 기능 개발',
    					projectGroup: 'Pandora.TV',
    					period: '2022년 10월 - 2019년 12월',
    					description: `<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발
                    
                        - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발
                        - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>
                        - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리
                        `
    				},
    				{
    					projectTitle: '앱 서비스 글쓰기/상세보기 웹뷰 전환',
    					projectGroup: 'Pandora.TV',
    					period: '2022년 08월 - 2022년 10월',
    					description: `- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업
                        - Ckeditor를 사용해 에디터 구현.
                        - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리
                        `
    				},
    				{
    					projectTitle: 'Global IDO 토큰중개 서비스',
    					projectGroup: 'Pandora.TV',
    					period: '2022년 06월 - 2022년 08월',
    					description: `web3를 사용한 지갑연동 및 상태 관리
                        - i18n라이브러리를 접목하여 다국어 기능을 지원.
                        - 자체토큰 스테이킹/거버넌스 기능
                        `
    				}
    			]
    		},
    		{
    			companyName: 'Evolve Branding (Canada)',
    			period: '2020-03~2020-09',
    			description: '비지니스 브랜딩을 돕는 캐나다 기업의 인턴십 프로그램의 팀 리더, Flutter 프레임워크를 사용하는 4개 프로젝트 참여',
    			detailList: [
    				{
    					content: 'Flutter/Dart를 사용한 IOS/Android App 제작'
    				},
    				{
    					content: 'Google 번역기 API 라이브러리 이용,  목소리 인식 실시간 번역 서비스'
    				},
    				{ content: 'Neumorphic 커스텀 테마 패키지 위젯 개발' }
    			],
    			techSkils: ['Flutter', 'Dart', 'firebase', 'Hybrid App'],
    			projects: [
    				{
    					projectTitle: 'CATBOOK (SNS)',
    					projectGroup: 'Evolve Branding',
    					period: '2020년 04월 - 2020년 05월',
    					description: `반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스
                    - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용
                    - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 
                    - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화
                        `
    				},
    				{
    					projectTitle: 'Evolve Store',
    					projectGroup: 'Evolve Branding',
    					period: '2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월',
    					description: `인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발

            - firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발
            - 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 적용
            - <b>팀 리더로 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.
                        `
    				},
    				{
    					projectTitle: 'Dictionary & Translator',
    					projectGroup: 'Evolve Branding',
    					period: '2020년 06월 - 2020년 09월',
    					description: `목소리를 인식하여 직역해주는 번역 프로그램 개발

            - <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발
            - 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.
            - 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.
                        `
    				}
    			]
    		},
    		{
    			companyName: 'F9dev',
    			period: '2017-06~2019-01',
    			description: '하이브리드 앱을 의뢰받아 구축 및 설계, 자사 e커머스 ClosedShop의 서비스 운영',
    			detailList: [
    				{
    					content: 'AngularJS, Ionic 을 사용한 WebView Hybrid App 개발'
    				},
    				{ content: 'Canvas를 사용하여 데이터를 시각화' },
    				{
    					content: 'Monthly 개발 컨퍼런스에 참여해 구성원으로서 기술로 회사의 비지니스에 더 많이 기여할 수 있는 방향을 고민'
    				},
    				{
    					content: '초기 멤버로써 서비스에 애정을 가지고 고객의 시선에서 경험을 최우선으로 하는 업무 분위기에서 프론트앤드 개발'
    				}
    			],
    			techSkils: ['AngularJs', 'Ionic', 'javaScript', 'ajax', 'html', 'sass', 'less'],
    			projects: [
    				{
    					projectTitle: '클로즈 샵(e-Commerce)',
    					projectGroup: 'F9dev',
    					period: '2018년 1월 - 2019년 01월',
    					description: `<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.

            - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발
            - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선
                        `
    				},
    				{
    					projectTitle: 'SPOTV (스포츠 스트리밍 서비스)',
    					projectGroup: 'F9dev',
    					period: '2018년 4월 - 2018년 7월',
    					description: `SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발

            - 넷플릭스의 참조해 전체적인 UI/UX를 디자인 및 구축
            - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>
                        `
    				},
    				{
    					projectTitle: 'RnbStory Hybrid APP (SNS)',
    					projectGroup: 'F9dev',
    					period: '2018년 4월 - 2018년 6월',
    					description: `RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.

            - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조
            - 웹 사이트 정비를 위한 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장
                        `
    				},
    				{
    					projectTitle: 'BuyCar(중고차) Hybrid App',
    					projectGroup: 'F9dev',
    					period: '2017년 8월 - 2019년 01월',
    					description: `자동차 중고거래 및 경매 플랫폼 운영 및 유지보수

            - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> 
            - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여
                        `
    				}
    			]
    		},
    		{
    			companyName: '㈜메이젠인터렉트',
    			period: '2016-01~2017-01',
    			description: '공공기관, 공기업, 큰 규모의 다양한 프로젝트의 마크업 개발 ',
    			detailList: [
    				{
    					content: '다수의 프로젝트 웹 접근성 90%→98% 불합격 수정 및 마크 획득'
    				},
    				{
    					content: '접근성이 지켜지지 않은 사이트들에 시맨틱 마크업을 적용해 SEO작업, 접근성 개선'
    				},
    				{ content: '브라우저 호환성 준수 등 크로스 브라우징 작업' },
    				{
    					content: 'Mobile First 휴대폰, 테블릿, PC 등의 다양한 디바이스 반응형 작업'
    				},
    				{
    					content: '프로젝트 레이아웃과 페이지 이슈에 대응하는 업무를 진행'
    				}
    			],
    			techSkils: ['Html', 'css', 'javaScript', 'jQuery'],
    			projects: [
    				{
    					projectTitle: '신한은행 임직원 강의 웹사이트 리뉴얼',
    					projectGroup: 'Mayzen',
    					period: '2016년 12월 - 2017년 12월',
    					description: `- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>
            - 유지보수를 위한 가이드 문서를 만들었습니다.
                        `
    				},
    				{
    					projectTitle: 'Hyundai Life web channel Construct',
    					projectGroup: 'Mayzen',
    					period: '2016년 8월 - 2016년 11월',
    					description: `- UI개발에 넥사크로 사용 `
    				},
    				{
    					projectTitle: '군인공제회 대학원 입학 홈페이지',
    					projectGroup: 'Mayzen',
    					period: '2017년 7월 - 2017년 8월',
    					description: null
    				},
    				{
    					projectTitle: '농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발',
    					projectGroup: 'Mayzen',
    					period: '2016년 2월 - 2016년 4월',
    					description: null
    				}
    			]
    		}
    	]
    };

    const otherprojects = [
    	{
    		projectTitle: 'NearBnb',
    		period: '2016년 2월 - 2016년 4월',
    		description: null
    	},
    	{
    		projectTitle: 'C-It',
    		period: '2016년 2월 - 2016년 4월',
    		description: null
    	}
    ];

    const projects = [
    	{
    		projectTitle: 'Cobak 블록체인 커뮤니티 운영/리뉴얼',
    		projectGroup: 'Pandora.TV',
    		period: '2021년 07월 - 진행 중',
    		description: `블록체인 커뮤니티 Cobak 운영 및 고도화

            - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여
            - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>
            - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체
            - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여
            - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>
        `
    	},
    	{
    		projectTitle: '뉴스속보/ 뉴스매체 커스텀 기능 개발',
    		projectGroup: 'Pandora.TV',
    		period: '2022년 10월 - 2019년 12월',
    		description: `<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발
        
            - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발
            - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>
            - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리
            `
    	},
    	{
    		projectTitle: '앱 서비스 글쓰기/상세보기 웹뷰 전환',
    		projectGroup: 'Pandora.TV',
    		period: '2022년 08월 - 2022년 10월',
    		description: `- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업
            - Ckeditor를 사용해 에디터 구현.
            - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리
            `
    	},
    	{
    		projectTitle: 'Global IDO 토큰중개 서비스',
    		projectGroup: 'Pandora.TV',
    		period: '2022년 06월 - 2022년 08월',
    		description: `web3를 사용한 지갑연동 및 상태 관리
            - i18n라이브러리를 접목하여 다국어 기능을 지원.
            - 자체토큰 스테이킹/거버넌스 기능
            `
    	},
    	{
    		projectTitle: 'CATBOOK (SNS)',
    		projectGroup: 'Evolve Branding',
    		period: '2020년 04월 - 2020년 05월',
    		description: `반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스
        - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용
        - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 
        - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화
            `
    	},
    	{
    		projectTitle: 'Evolve Store',
    		projectGroup: 'Evolve Branding',
    		period: '2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월',
    		description: `인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발

- firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발
- 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 적용
- <b>팀 리더로 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.
            `
    	},
    	{
    		projectTitle: 'Dictionary & Translator',
    		projectGroup: 'Evolve Branding',
    		period: '2020년 06월 - 2020년 09월',
    		description: `목소리를 인식하여 직역해주는 번역 프로그램 개발

- <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발
- 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.
- 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.
            `
    	},
    	{
    		projectTitle: '클로즈 샵(e-Commerce)',
    		projectGroup: 'F9dev',
    		period: '2018년 1월 - 2019년 01월',
    		description: `<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.

    - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발
    - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선
                `
    	},
    	{
    		projectTitle: 'SPOTV (스포츠 스트리밍 서비스)',
    		projectGroup: 'F9dev',
    		period: '2018년 4월 - 2018년 7월',
    		description: `SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발

    - 넷플릭스의 참조해 전체적인 UI/UX를 디자인 및 구축
    - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>
                `
    	},
    	{
    		projectTitle: 'RnbStory Hybrid APP (SNS)',
    		projectGroup: 'F9dev',
    		period: '2018년 4월 - 2018년 6월',
    		description: `RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.

    - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조
    - 웹 사이트 정비를 위한 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장
                `
    	},
    	{
    		projectTitle: 'BuyCar(중고차) Hybrid App',
    		projectGroup: 'F9dev',
    		period: '2017년 8월 - 2019년 01월',
    		description: `자동차 중고거래 및 경매 플랫폼 운영 및 유지보수

    - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> 
    - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여
                `
    	},
    	{
    		projectTitle: '신한은행 임직원 강의 웹사이트 리뉴얼',
    		projectGroup: 'Mayzen',
    		period: '2016년 12월 - 2017년 12월',
    		description: `- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>
    - 유지보수를 위한 가이드 문서를 만들었습니다.
                `
    	},
    	{
    		projectTitle: 'Hyundai Life web channel Construct',
    		projectGroup: 'Mayzen',
    		period: '2016년 8월 - 2016년 11월',
    		description: `- UI개발에 넥사크로 사용 `
    	},
    	{
    		projectTitle: '군인공제회 대학원 입학 홈페이지',
    		projectGroup: 'Mayzen',
    		period: '2017년 7월 - 2017년 8월',
    		description: null
    	},
    	{
    		projectTitle: '농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발',
    		projectGroup: 'Mayzen',
    		period: '2016년 2월 - 2016년 4월',
    		description: null
    	}
    ];

    /* src\App.svelte generated by Svelte v3.55.1 */

    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let span0;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let span1;
    	let t7;
    	let introduction;
    	let t8;
    	let div0;
    	let t9;
    	let div1;
    	let contractinfobox0;
    	let t10;
    	let contractinfobox1;
    	let t11;
    	let experiences;
    	let t12;
    	let projects0;
    	let t13;
    	let projects1;
    	let current;

    	introduction = new Introduction({
    			props: { introduction: introductionText },
    			$$inline: true
    		});

    	contractinfobox0 = new ContractInfoBox({
    			props: { title: 'Channels', list: channels },
    			$$inline: true
    		});

    	contractinfobox1 = new ContractInfoBox({
    			props: { title: 'Contracts', list: contract },
    			$$inline: true
    		});

    	experiences = new Experiences({
    			props: {
    				title: "EXPERIENCES & PROJECTS",
    				item: workSection
    			},
    			$$inline: true
    		});

    	projects0 = new Projects({
    			props: { title: "PROJECTS", projects },
    			$$inline: true
    		});

    	projects1 = new Projects({
    			props: {
    				title: "OTHER PROJECTS",
    				projects: otherprojects
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			span0 = element("span");
    			t0 = text(name);
    			t1 = text(" (");
    			t2 = text(engName);
    			t3 = text(")");
    			t4 = space();
    			span1 = element("span");
    			span1.textContent = `last updated: ${lastUpdated}`;
    			t7 = space();
    			create_component(introduction.$$.fragment);
    			t8 = space();
    			div0 = element("div");
    			t9 = space();
    			div1 = element("div");
    			create_component(contractinfobox0.$$.fragment);
    			t10 = space();
    			create_component(contractinfobox1.$$.fragment);
    			t11 = space();
    			create_component(experiences.$$.fragment);
    			t12 = space();
    			create_component(projects0.$$.fragment);
    			t13 = space();
    			create_component(projects1.$$.fragment);
    			attr_dev(span0, "class", "deco_bar svelte-1q6key");
    			add_location(span0, file, 9, 5, 462);
    			attr_dev(h1, "class", "svelte-1q6key");
    			add_location(h1, file, 9, 1, 458);
    			attr_dev(span1, "class", "update_date svelte-1q6key");
    			add_location(span1, file, 10, 1, 513);
    			attr_dev(div0, "class", "div svelte-1q6key");
    			add_location(div0, file, 12, 1, 627);
    			attr_dev(div1, "class", "contracts_info");
    			add_location(div1, file, 13, 1, 649);
    			attr_dev(main, "class", "svelte-1q6key");
    			add_location(main, file, 8, 0, 449);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, span0);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(h1, t3);
    			append_dev(main, t4);
    			append_dev(main, span1);
    			append_dev(main, t7);
    			mount_component(introduction, main, null);
    			append_dev(main, t8);
    			append_dev(main, div0);
    			append_dev(main, t9);
    			append_dev(main, div1);
    			mount_component(contractinfobox0, div1, null);
    			append_dev(div1, t10);
    			mount_component(contractinfobox1, div1, null);
    			append_dev(main, t11);
    			mount_component(experiences, main, null);
    			append_dev(main, t12);
    			mount_component(projects0, main, null);
    			append_dev(main, t13);
    			mount_component(projects1, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(introduction.$$.fragment, local);
    			transition_in(contractinfobox0.$$.fragment, local);
    			transition_in(contractinfobox1.$$.fragment, local);
    			transition_in(experiences.$$.fragment, local);
    			transition_in(projects0.$$.fragment, local);
    			transition_in(projects1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(introduction.$$.fragment, local);
    			transition_out(contractinfobox0.$$.fragment, local);
    			transition_out(contractinfobox1.$$.fragment, local);
    			transition_out(experiences.$$.fragment, local);
    			transition_out(projects0.$$.fragment, local);
    			transition_out(projects1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(introduction);
    			destroy_component(contractinfobox0);
    			destroy_component(contractinfobox1);
    			destroy_component(experiences);
    			destroy_component(projects0);
    			destroy_component(projects1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ContractInfoBox,
    		Introduction,
    		Experiences,
    		Projects,
    		name,
    		engName,
    		lastUpdated,
    		channels,
    		contract,
    		introductionText,
    		workSection,
    		projects,
    		otherprojects
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
