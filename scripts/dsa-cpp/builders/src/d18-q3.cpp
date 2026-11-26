#include <bits/stdc++.h>
using namespace std;

void finish_order(const std::vector<std::pair<int,int>>& acts, std::vector<int>& out) {
    int n = (int)acts.size();
    out.resize(n);
    for (int i = 0; i < n; i++) out[i] = i;
    for (int i = 1; i < n; i++) {
        int cur = out[i];
        int j = i - 1;
        while (j >= 0 && acts[out[j]].second > acts[cur].second) {
            out[j + 1] = out[j];
            j--;
        }
        out[j + 1] = cur;
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    vector<int> out;
    finish_order(acts, out);
    for (int i = 0; i < (int)out.size(); i++) {
        if (i) cout << " ";
        cout << out[i];
    }
    cout << "\n";
    return 0;
}
