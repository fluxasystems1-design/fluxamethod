'use client';

import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    var prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';

    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) {
      return function () {
        document.documentElement.style.scrollBehavior = prev;
      };
    }

    function revealNode(node) {
      node.setAttribute('data-visible', 'true');
    }

    function flushVisible() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      nodes.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          revealNode(n);
        }
      });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealNode(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });

    requestAnimationFrame(function () {
      flushVisible();
    });

    return function () {
      document.documentElement.style.scrollBehavior = prev;
      io.disconnect();
    };
  }, []);
}

export function useFaqAccordion() {
  useEffect(() => {
    var root = document.querySelector('[data-faq-root]');
    if (!root) return undefined;

    var items = root.querySelectorAll('[data-faq-item]');
    var cleanups = [];

    items.forEach(function (item) {
      var btn = item.querySelector('[data-faq-trigger]');
      var panel = item.querySelector('[data-faq-panel]');
      if (!btn || !panel) return;

      var onClick = function () {
        var open = item.getAttribute('data-open') === 'true';
        items.forEach(function (other) {
          other.setAttribute('data-open', 'false');
          var ob = other.querySelector('[data-faq-trigger]');
          var op = other.querySelector('[data-faq-panel]');
          if (ob) ob.setAttribute('aria-expanded', 'false');
          if (op) op.style.maxHeight = '';
        });
        if (!open) {
          item.setAttribute('data-open', 'true');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 24 + 'px';
        }
      };

      btn.addEventListener('click', onClick);
      cleanups.push(function () {
        btn.removeEventListener('click', onClick);
      });
    });

    return function () {
      cleanups.forEach(function (fn) {
        fn();
      });
    };
  }, []);
}
