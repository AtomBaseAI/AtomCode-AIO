/**
 * Day 17 (Graph Algorithms) — complete standalone programs.
 * Honors per-question blacklist/whitelist substrings (queue<, state, parent, visited, key, indegree,
 * dist, color, grid). DSU unions hang root of b beneath root of a (parent[root_b] = root_a);
 * Prim/Dijkstra/Kahn use linear scans, no priority queue.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-17.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-17.code.json";
const MCQ_SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-17.mcq.json";
const MCQ_OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-17.mcq.json";

const DIR_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::vector<int>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v;
        std::cin >> u >> v;
        adj[u].push_back(v);
    }`;

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

const W_DIR_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::vector<std::pair<int,int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        std::cin >> u >> v >> w;
        adj[u].push_back(std::make_pair(v, w));
    }`;

const W_UNDIR_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::vector<std::pair<int,int>>> adj(V);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        std::cin >> u >> v >> w;
        adj[u].push_back(std::make_pair(v, w));
        adj[v].push_back(std::make_pair(u, w));
    }`;

const LINKS_MAIN = `int main() {
    int V, E;
    std::cin >> V >> E;
    std::vector<std::pair<int,int>> links(E);
    for (int i = 0; i < E; i++) {
        int u, v;
        std::cin >> u >> v;
        links[i] = std::make_pair(u, v);
    }`;

const FIND_ROOT = `int find_root(std::vector<int>& parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}`;

const DFS_COMPONENT = `void dfs_component(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& visited) {
    visited[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (!visited[v]) dfs_component(v, adj, visited);
    }
}`;

const BFS_HOPS_FN = `int min_hops(int V, const std::vector<std::vector<int>>& adj, int src, int dst) {
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
}`;

const DFS_CYCLE = `bool dfs_cycle(int u, const std::vector<std::vector<int>>& adj, std::vector<int>& STATE) {
    STATE[u] = 1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (STATE[v] == 1) return true;
        if (STATE[v] == 0 && dfs_cycle(v, adj, STATE)) return true;
    }
    STATE[u] = 2;
    return false;
}`;

const programs = [
  /* Q0 Find the Set Root */
  `#include <iostream>
#include <vector>

${FIND_ROOT}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> parent(n);
    for (int i = 0; i < n; i++) std::cin >> parent[i];
    int x;
    std::cin >> x;
    std::cout << find_root(parent, x) << "\\n";
    return 0;
}
`,
  /* Q1 Union and Find the Root */
  `#include <iostream>
#include <vector>

${FIND_ROOT}

void union_sets(std::vector<int>& parent, int a, int b) {
    int ra = find_root(parent, a);
    int rb = find_root(parent, b);
    if (ra != rb) parent[rb] = ra;
}

int main() {
    int n, k;
    std::cin >> n >> k;
    std::vector<int> parent(n);
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < k; i++) {
        int a, b;
        std::cin >> a >> b;
        union_sets(parent, a, b);
    }
    int x;
    std::cin >> x;
    std::cout << find_root(parent, x) << "\\n";
    return 0;
}
`,
  /* Q2 Direct Flight Price Lookup (weighted undirected) */
  `#include <iostream>
#include <vector>
#include <utility>

int flight_price(const std::vector<std::vector<std::pair<int,int>>>& adj, int u, int v) {
    for (size_t i = 0; i < adj[u].size(); i++) {
        if (adj[u][i].first == v) return adj[u][i].second;
    }
    return -1;
}

${W_UNDIR_MAIN}
    int u, v;
    std::cin >> u >> v;
    std::cout << flight_price(adj, u, v) << "\\n";
    return 0;
}
`,
  /* Q3 Cheapest Incident Cable (weighted undirected) */
  `#include <iostream>
#include <vector>
#include <utility>

int cheapest_cable(const std::vector<std::vector<std::pair<int,int>>>& adj, int u) {
    int best = -1;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int w = adj[u][i].second;
        if (best == -1 || w < best) best = w;
    }
    return best;
}

${W_UNDIR_MAIN}
    int u;
    std::cin >> u;
    std::cout << cheapest_cable(adj, u) << "\\n";
    return 0;
}
`,
  /* Q4 Count the Source Tasks (directed, in-degree 0) */
  `#include <iostream>
#include <vector>

int source_count(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> indegree(V, 0);
    for (int u = 0; u < V; u++)
        for (size_t i = 0; i < adj[u].size(); i++) indegree[adj[u][i]]++;
    int c = 0;
    for (int i = 0; i < V; i++)
        if (indegree[i] == 0) c++;
    return c;
}

${DIR_MAIN}
    std::cout << source_count(V, adj) << "\\n";
    return 0;
}
`,
  /* Q5 In-degree of the Task (directed) */
  `#include <iostream>
#include <vector>

int in_degree(int V, const std::vector<std::vector<int>>& adj, int u) {
    int c = 0;
    for (int v = 0; v < V; v++)
        for (size_t i = 0; i < adj[v].size(); i++)
            if (adj[v][i] == u) c++;
    return c;
}

${DIR_MAIN}
    int u;
    std::cin >> u;
    std::cout << in_degree(V, adj, u) << "\\n";
    return 0;
}
`,
  /* Q6 Cables to Wire the Districts (components - 1) */
  `#include <iostream>
#include <vector>

${DFS_COMPONENT}

int cables_needed(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> visited(V, 0);
    int c = 0;
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs_component(i, adj, visited);
            c++;
        }
    }
    return c - 1;
}

${UNDIR_MAIN}
    std::cout << cables_needed(V, adj) << "\\n";
    return 0;
}
`,
  /* Q7 Cheapest Flight from the Hub (weighted directed out-links) */
  `#include <iostream>
#include <vector>
#include <utility>

int cheapest_flight(const std::vector<std::vector<std::pair<int,int>>>& adj, int hub) {
    int best = -1;
    for (size_t i = 0; i < adj[hub].size(); i++) {
        int w = adj[hub][i].second;
        if (best == -1 || w < best) best = w;
    }
    return best;
}

${W_DIR_MAIN}
    int hub;
    std::cin >> hub;
    std::cout << cheapest_flight(adj, hub) << "\\n";
    return 0;
}
`,
  /* Q8 Can the Morning Routine Be Scheduled? (DFS colors, acyclic = 1) */
  `#include <iostream>
#include <vector>

${DFS_CYCLE.replace(/STATE/g, "color")}

int is_schedulable(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> color(V, 0);
    for (int i = 0; i < V; i++)
        if (color[i] == 0 && dfs_cycle(i, adj, color)) return 0;
    return 1;
}

${DIR_MAIN}
    std::cout << is_schedulable(V, adj) << "\\n";
    return 0;
}
`,
  /* Q9 Parcel Relay Hops (BFS levels) */
  `#include <iostream>
#include <vector>
#include <queue>

${BFS_HOPS_FN}

int parcel_hops(int V, const std::vector<std::vector<int>>& adj, int src, int dst) {
    return min_hops(V, adj, src, dst);
}

${UNDIR_MAIN}
    int src, dst;
    std::cin >> src >> dst;
    std::cout << parcel_hops(V, adj, src, dst) << "\\n";
    return 0;
}
`,
  /* Q10 Build Order Cycle Alert (DFS colors named state; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

${DFS_CYCLE.replace(/STATE/g, "state")}

int has_cycle(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> state(V, 0);
    for (int i = 0; i < V; i++)
        if (state[i] == 0 && dfs_cycle(i, adj, state)) return 1;
    return 0;
}

${DIR_MAIN}
    std::cout << has_cycle(V, adj) << "\\n";
    return 0;
}
`,
  /* Q11 Servers in the Same Cluster? (DSU built in-function; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <utility>

int dsu_find(std::vector<int>& parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

int same_cluster(int V, const std::vector<std::pair<int,int>>& links, int a, int b) {
    std::vector<int> parent(V);
    for (int i = 0; i < V; i++) parent[i] = i;
    for (size_t i = 0; i < links.size(); i++) {
        int ra = dsu_find(parent, links[i].first);
        int rb = dsu_find(parent, links[i].second);
        if (ra != rb) parent[rb] = ra;
    }
    return dsu_find(parent, a) == dsu_find(parent, b) ? 1 : 0;
}

${LINKS_MAIN}
    int a, b;
    std::cin >> a >> b;
    std::cout << same_cluster(V, links, a, b) << "\\n";
    return 0;
}
`,
  /* Q12 Loop Created by the New Road? (DSU cycle check; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <utility>

int dsu_find(std::vector<int>& parent, int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}

int creates_loop(int V, const std::vector<std::pair<int,int>>& roads) {
    std::vector<int> parent(V);
    for (int i = 0; i < V; i++) parent[i] = i;
    for (size_t i = 0; i < roads.size(); i++) {
        int ra = dsu_find(parent, roads[i].first);
        int rb = dsu_find(parent, roads[i].second);
        if (ra == rb) return 1;
        parent[rb] = ra;
    }
    return 0;
}

${LINKS_MAIN}
    std::cout << creates_loop(V, links) << "\\n";
    return 0;
}
`,
  /* Q13 Count the Server Clusters (DFS over adjacency view; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <utility>

${DFS_COMPONENT}

int cluster_count(int V, const std::vector<std::pair<int,int>>& links) {
    std::vector<std::vector<int>> adj(V);
    for (size_t i = 0; i < links.size(); i++) {
        adj[links[i].first].push_back(links[i].second);
        adj[links[i].second].push_back(links[i].first);
    }
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

${LINKS_MAIN}
    std::cout << cluster_count(V, links) << "\\n";
    return 0;
}
`,
  /* Q14 Prim's Cabling Cost (key-array linear scan; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <utility>

long long mst_cost(int V, const std::vector<std::vector<std::pair<int,int>>>& adj) {
    const long long INF = 1LL << 60;
    std::vector<long long> key(V, INF);
    std::vector<int> in_tree(V, 0);
    key[0] = 0;
    long long total = 0;
    for (int step = 0; step < V; step++) {
        int u = -1;
        for (int i = 0; i < V; i++)
            if (!in_tree[i] && key[i] < INF && (u == -1 || key[i] < key[u])) u = i;
        if (u == -1) break;
        in_tree[u] = 1;
        total += key[u];
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i].first;
            long long w = adj[u][i].second;
            if (!in_tree[v] && w < key[v]) key[v] = w;
        }
    }
    return total;
}

${W_UNDIR_MAIN}
    std::cout << mst_cost(V, adj) << "\\n";
    return 0;
}
`,
  /* Q15 Strongly Connected Road Network (DFS on graph + transpose; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

${DFS_COMPONENT}

int is_strongly_connected(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> visited(V, 0);
    dfs_component(0, adj, visited);
    for (int i = 0; i < V; i++)
        if (!visited[i]) return 0;
    std::vector<std::vector<int>> radj(V);
    for (int u = 0; u < V; u++)
        for (size_t i = 0; i < adj[u].size(); i++)
            radj[adj[u][i]].push_back(u);
    std::vector<int> rvisited(V, 0);
    dfs_component(0, radj, rvisited);
    for (int i = 0; i < V; i++)
        if (!rvisited[i]) return 0;
    return 1;
}

${DIR_MAIN}
    std::cout << is_strongly_connected(V, adj) << "\\n";
    return 0;
}
`,
  /* Q16 Kahn Topological Fill (smallest-index scan; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

void topo_order(int V, const std::vector<std::vector<int>>& adj, std::vector<int>& out) {
    std::vector<int> indegree(V, 0);
    for (int u = 0; u < V; u++)
        for (size_t i = 0; i < adj[u].size(); i++) indegree[adj[u][i]]++;
    std::vector<int> emitted(V, 0);
    for (int step = 0; step < V; step++) {
        int pick = -1;
        for (int i = 0; i < V; i++) {
            if (!emitted[i] && indegree[i] == 0) {
                pick = i;
                break;
            }
        }
        emitted[pick] = 1;
        out.push_back(pick);
        for (size_t i = 0; i < adj[pick].size(); i++) indegree[adj[pick][i]]--;
    }
}

${DIR_MAIN}
    std::vector<int> out;
    topo_order(V, adj, out);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << out[i];
    }
    std::cout << "\\n";
    return 0;
}
`,
  /* Q17 Dijkstra Delivery Distance (dist array linear scan; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <utility>

long long dijkstra_dist(int V, const std::vector<std::vector<std::pair<int,int>>>& adj) {
    const long long INF = 1LL << 60;
    std::vector<long long> dist(V, INF);
    std::vector<int> settled(V, 0);
    dist[0] = 0;
    for (int step = 0; step < V; step++) {
        int u = -1;
        for (int i = 0; i < V; i++)
            if (!settled[i] && dist[i] < INF && (u == -1 || dist[i] < dist[u])) u = i;
        if (u == -1) break;
        settled[u] = 1;
        for (size_t i = 0; i < adj[u].size(); i++) {
            int v = adj[u][i].first;
            long long w = adj[u][i].second;
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    return dist[V - 1] >= INF ? -1 : dist[V - 1];
}

${W_DIR_MAIN}
    std::cout << dijkstra_dist(V, adj) << "\\n";
    return 0;
}
`,
  /* Q18 Two-Team Tournament Check (recursive 2-coloring; blacklist: no queue<) */
  `#include <iostream>
#include <vector>

bool color_dfs(int u, int c, const std::vector<std::vector<int>>& adj, std::vector<int>& color) {
    color[u] = c;
    for (size_t i = 0; i < adj[u].size(); i++) {
        int v = adj[u][i];
        if (color[v] == -1) {
            if (!color_dfs(v, 1 - c, adj, color)) return false;
        } else if (color[v] == c) {
            return false;
        }
    }
    return true;
}

int is_bipartite(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> color(V, -1);
    for (int i = 0; i < V; i++)
        if (color[i] == -1 && !color_dfs(i, 0, adj, color)) return 0;
    return 1;
}

${UNDIR_MAIN}
    std::cout << is_bipartite(V, adj) << "\\n";
    return 0;
}
`,
  /* Q19 Count the Islands (recursive flood fill; blacklist: no queue<) */
  `#include <iostream>
#include <vector>
#include <string>

void sink(std::vector<std::vector<char>>& grid, int r, int c) {
    if (r < 0 || r >= (int)grid.size() || c < 0 || c >= (int)grid[0].size()) return;
    if (grid[r][c] != '1') return;
    grid[r][c] = '0';
    sink(grid, r + 1, c);
    sink(grid, r - 1, c);
    sink(grid, r, c + 1);
    sink(grid, r, c - 1);
}

int island_count(std::vector<std::vector<char>>& grid) {
    int cnt = 0;
    for (int r = 0; r < (int)grid.size(); r++)
        for (int c = 0; c < (int)grid[r].size(); c++)
            if (grid[r][c] == '1') {
                cnt++;
                sink(grid, r, c);
            }
    return cnt;
}

int main() {
    int R, C;
    std::cin >> R >> C;
    std::vector<std::vector<char>> grid(R, std::vector<char>(C, '0'));
    for (int r = 0; r < R; r++) {
        std::string row;
        std::cin >> row;
        for (int c = 0; c < C && c < (int)row.size(); c++) grid[r][c] = row[c];
    }
    std::cout << island_count(grid) << "\\n";
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
console.log(`day-17.code.json written: ${data.questions.length} programs`);

const mcqSrc = JSON.parse(readFileSync(MCQ_SRC, "utf8"));
const mcqOut = { day: mcqSrc.day, questions: mcqSrc.questions.map(({ _id, ...rest }) => rest) };
writeFileSync(MCQ_OUT, JSON.stringify(mcqOut, null, 2));
console.log(`day-17.mcq.json written: ${mcqOut.questions.length} questions (ids stripped)`);
