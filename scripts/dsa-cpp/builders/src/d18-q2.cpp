#include <bits/stdc++.h>
using namespace std;

int earliest_finish_index(const std::vector<std::pair<int,int>>& acts) {
    int best = 0;
    for (int i = 1; i < (int)acts.size(); i++)
        if (acts[i].second < acts[best].second) best = i;
    return best;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    cout << earliest_finish_index(acts) << "\n";
    return 0;
}
