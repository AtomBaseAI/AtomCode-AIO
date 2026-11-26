/**
 * Day 16 (Graph Fundamentals and Traversals) — complete standalone programs.
 * Honors per-question blacklist/whitelist substrings (queue<, stack<, sort(, visited, queue, adj, label).
 * Harness builds the adjacency list per documented input; undirected edges stored at both endpoints
 * in input order for deterministic BFS/DFS traces.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-16.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-16.code.json";
const MCQ_SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-16.mcq.json";
const MCQ_OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-16.mcq.json";

// main() head: undirected graph — adj lists built in input order, both endpoints
const UNDIR_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        std::cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }`;

// main() head: directed graph — out-neighbors only
const DIR_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        std::cin >> u >> v;
        adj[u].push_back(v);
    }`;

// space-separated vector print (variable named out, length lenExpr) + newline
const PRINT_VEC = (lenExpr) => `    for (int i = 0; i < ${lenExpr}; i++) {
        if (i) std::cout << ' ';
        std::cout << out[i];
    }
    std::cout << "\\n";`;

const programs = [
  /* Q0 Matrix Row of the City Map */
  `#include <iostream>
#include <vector>

void matrix_row(int V, const std::vector<std::vector<int>>& adj, int u, std::vector<int>& out) {
    out.assign(V, 0);
    for (size_t i = 0; i < adj[u].size(); i++) out[adj[u][i]] = 1;
}

${UNDIR_MAIN}
    int u;
    std::cin >> u;
    std::vector<int> out;
    matrix_row(V, adj, u, out);
${PRINT_VEC("V")}
    return 0;
}
`,
  /* Q1 Degree of a Network Node */
  `#include <iostream>
#include <vector>

int node_degree(const std::vector<std::vector<int>>& adj, int u) {
    return (int)adj[u].size();
}

${UNDIR_MAIN}
    int u;
    std::cin >> u;
    std::cout << node_degree(adj, u) << "\\n";
    return 0;
}
`,
  /* Q2 Count the Network Edges */
  `#include <iostream>
#include <vector>

int edge_count(int V, const std::vector<std::vector<int>>& adj) {
    int total = 0;
    for (int i = 0; i < V; i++) total += (int)adj[i].size();
    return total / 2;
}

${UNDIR_MAIN}
    std::cout << edge_count(V, adj) << "\\n";
    return 0;
}
`,
  /* Q3 Neighbors of the Hub */
  `#include <iostream>
#include <vector>

void neighbors_of(const std::vector<std::vector<int>>& adj, int u, std::vector<int>& out) {
    out = adj[u];
}

${UNDIR_MAIN}
    int u;
    std::cin >> u;
    std::vector<int> out;
    neighbors_of(adj, u, out);
${PRINT_VEC("(int)out.size()")}
    return 0;
}
`,
  /* Q4 Outgoing Links of the Page (directed) */
  `#include <iostream>
#include <vector>

int out_degree(const std::vector<std::vector<int>>& adj, int u) {
    return (int)adj[u].size();
}

${DIR_MAIN}
    int u;
    std::cin >> u;
    std::cout << out_degree(adj, u) << "\\n";
    return 0;
}
`,
  /* Q5 Isolated Servers Count */
  `#include <iostream>
#include <vector>

int isolated_count(int V, const std::vector<std::vector<int>>& adj) {
    int c = 0;
    for (int i = 0; i < V; i++)
        if (adj[i].empty()) c++;
    return c;
}

${UNDIR_MAIN}
    std::cout << isolated_count(V, adj) << "\\n";
    return 0;
}
`,
  /* Q6 Crawler Visit Order (BFS with std::queue) */
  `#include <iostream>
#include <vector>
#include <queue>

void bfs_order(int V, const std::vector<std::vector<int>>& adj, int start, std::vector<int>& out) {
    std::vector<int> visited(V, 0);
    std::queue<int> q;
    q.push(start);
    visited[start] = 1;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        out.push_back(u);
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (!visited[v]) {
                visited[v] = 1;
                q.push(v);
            }
        }
    }
}

${UNDIR_MAIN}
    int start;
    std::cin >> start;
    std::vector<int> out;
    bfs_order(V, adj, start, out);
${PRINT_VEC("(int)out.size()")}
    return 0;
}
`,
  /* Q7 Dependency Chain Walk (recursive DFS, directed) */
  `#include <iostream>
#include <vector>

void dfs_fill(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited, std::vector<int>& out) {
    visited[u] = 1;
    out.push_back(u);
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_fill(v, adj, visited, out);
    }
}

${DIR_MAIN}
    int start;
    std::cin >> start;
    std::vector<int> visited(V, 0);
    std::vector<int> out;
    dfs_fill(start, adj, visited, out);
${PRINT_VEC("(int)out.size()")}
    return 0;
}
`,
  /* Q8 Broadcast Reach (BFS count) */
  `#include <iostream>
#include <vector>
#include <queue>

int reachable_count(int V, const std::vector<std::vector<int>>& adj, int start) {
    std::vector<int> visited(V, 0);
    std::queue<int> q;
    q.push(start);
    visited[start] = 1;
    int c = 0;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        c++;
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (!visited[v]) {
                visited[v] = 1;
                q.push(v);
            }
        }
    }
    return c;
}

${UNDIR_MAIN}
    int start;
    std::cin >> start;
    std::cout << reachable_count(V, adj, start) << "\\n";
    return 0;
}
`,
  /* Q9 Minimum Flight Hops (BFS levels) */
  `#include <iostream>
#include <vector>
#include <queue>

int shortest_hops(int V, const std::vector<std::vector<int>>& adj, int src, int dst) {
    if (src == dst) return 0;
    std::vector<int> dist(V, -1);
    std::queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                if (v == dst) return dist[v];
                q.push(v);
            }
        }
    }
    return -1;
}

${UNDIR_MAIN}
    int src, dst;
    std::cin >> src >> dst;
    std::cout << shortest_hops(V, adj, src, dst) << "\\n";
    return 0;
}
`,
  /* Q10 Power Grid Zone Count (blacklist: no queue<; recursive DFS) */
  `#include <iostream>
#include <vector>

void dfs_component(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_component(v, adj, visited);
    }
}

int count_components(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> visited(V, 0);
    int c = 0;
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs_component(i, adj, visited);
            c++;
        }
    }
    return c;
}

${UNDIR_MAIN}
    std::cout << count_components(V, adj) << "\\n";
    return 0;
}
`,
  /* Q11 Size of the User's Circle (blacklist: no queue<; recursive DFS) */
  `#include <iostream>
#include <vector>

void dfs_component(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_component(v, adj, visited);
    }
}

int component_size(int V, const std::vector<std::vector<int>>& adj, int s) {
    std::vector<int> visited(V, 0);
    dfs_component(s, adj, visited);
    int c = 0;
    for (int i = 0; i < V; i++)
        if (visited[i]) c++;
    return c;
}

${UNDIR_MAIN}
    int s;
    std::cin >> s;
    std::cout << component_size(V, adj, s) << "\\n";
    return 0;
}
`,
  /* Q12 Devices at Exactly k Relays (BFS levels; blacklist: no stack<) */
  `#include <iostream>
#include <vector>
#include <queue>

int count_at_hops(int V, const std::vector<std::vector<int>>& adj, int src, int k) {
    std::vector<int> dist(V, -1);
    std::queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    int c = 0;
    for (int i = 0; i < V; i++)
        if (dist[i] == k) c++;
    return c;
}

${UNDIR_MAIN}
    int src, k;
    std::cin >> src >> k;
    std::cout << count_at_hops(V, adj, src, k) << "\\n";
    return 0;
}
`,
  /* Q13 Request Routing Feasibility (directed reachability; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

void dfs_reach(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_reach(v, adj, visited);
    }
}

int can_reach(int V, const std::vector<std::vector<int>>& adj, int s, int t) {
    std::vector<int> visited(V, 0);
    dfs_reach(s, adj, visited);
    return visited[t] ? 1 : 0;
}

${DIR_MAIN}
    int s, t;
    std::cin >> s >> t;
    std::cout << can_reach(V, adj, s, t) << "\\n";
    return 0;
}
`,
  /* Q14 Is the Road Map a Tree? (blacklist: no queue<) */
  `#include <iostream>
#include <vector>

void dfs_visit(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_visit(v, adj, visited);
    }
}

int is_tree(int V, const std::vector<std::vector<int>>& adj) {
    int edges = 0;
    for (int i = 0; i < V; i++) edges += (int)adj[i].size();
    if (edges / 2 != V - 1) return 0;
    std::vector<int> visited(V, 0);
    dfs_visit(0, adj, visited);
    for (int i = 0; i < V; i++)
        if (!visited[i]) return 0;
    return 1;
}

${UNDIR_MAIN}
    std::cout << is_tree(V, adj) << "\\n";
    return 0;
}
`,
  /* Q15 Junction With the Most Roads (blacklist: no sort(; linear scan) */
  `#include <iostream>
#include <vector>

int busiest_junction(int V, const std::vector<std::vector<int>>& adj) {
    int best = 0;
    for (int i = 1; i < V; i++)
        if (adj[i].size() > adj[best].size()) best = i;
    return best;
}

${UNDIR_MAIN}
    std::cout << busiest_junction(V, adj) << "\\n";
    return 0;
}
`,
  /* Q16 Hop Distances from the Depot (BFS distances; blacklist: no stack<) */
  `#include <iostream>
#include <vector>
#include <queue>

void hop_distances(int V, const std::vector<std::vector<int>>& adj, int src, std::vector<int>& out) {
    out.assign(V, -1);
    std::queue<int> q;
    out[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (out[v] == -1) {
                out[v] = out[u] + 1;
                q.push(v);
            }
        }
    }
}

${UNDIR_MAIN}
    int src;
    std::cin >> src;
    std::vector<int> out;
    hop_distances(V, adj, src, out);
${PRINT_VEC("V")}
    return 0;
}
`,
  /* Q17 Zone Labels for Every District (component ids by smallest member; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

void dfs_label(int u, int id, const std::vector<std::vector<int>>& adj, std::vector<int>& label) {
    label[u] = id;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (label[v] == -1) dfs_label(v, id, adj, label);
    }
}

void component_labels(int V, const std::vector<std::vector<int>>& adj, std::vector<int>& out) {
    out.assign(V, -1);
    int id = 0;
    for (int i = 0; i < V; i++) {
        if (out[i] == -1) {
            dfs_label(i, id, adj, out);
            id++;
        }
    }
}

${UNDIR_MAIN}
    std::vector<int> out;
    component_labels(V, adj, out);
${PRINT_VEC("V")}
    return 0;
}
`,
  /* Q18 Farthest Sensor from the Base (BFS distances; blacklist: no stack<) */
  `#include <iostream>
#include <vector>
#include <queue>

int farthest_node(int V, const std::vector<std::vector<int>>& adj, int src) {
    std::vector<int> dist(V, -1);
    std::queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i];
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    int best = src;
    for (int i = 0; i < V; i++)
        if (dist[i] > dist[best]) best = i;
    return best;
}

${UNDIR_MAIN}
    int src;
    std::cin >> src;
    std::cout << farthest_node(V, adj, src) << "\\n";
    return 0;
}
`,
  /* Q19 Mother Server of the Cluster (directed; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

void dfs_from(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_from(v, adj, visited);
    }
}

int mother_vertex(int V, const std::vector<std::vector<int>>& adj) {
    for (int cand = 0; cand < V; cand++) {
        std::vector<int> visited(V, 0);
        dfs_from(cand, adj, visited);
        bool all = true;
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                all = false;
                break;
            }
        }
        if (all) return cand;
    }
    return -1;
}

${DIR_MAIN}
    std::cout << mother_vertex(V, adj) << "\\n";
    return 0;
}
`,
];

const data = JSON.parse(readFileSync(SRC, "utf8"));
if (data.questions.length !== programs.length)
  throw new Error(`expected ${data.questions.length} programs, got ${programs.length}`);
data.questions.forEach((q, i) => {
  q.sourcecode = programs[i];
});
writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`day-16.code.json written: ${data.questions.length} programs`);

const mcqSrc = JSON.parse(readFileSync(MCQ_SRC, "utf8"));
const mcqOut = { day: mcqSrc.day, questions: mcqSrc.questions.map(({ _id, ...rest }) => rest) };
writeFileSync(MCQ_OUT, JSON.stringify(mcqOut, null, 2));
console.log(`day-16.mcq.json written: ${mcqOut.questions.length} questions (ids stripped)`);
