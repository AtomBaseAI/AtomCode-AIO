#include <bits/stdc++.h>
using namespace std;

int lis_length(const std::vector<long long>& a) {
    int n = (int)a.size();
    std::vector<int> dp(n, 1);
    int best = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
        if (dp[i] > best) best = dp[i];
    }
    return best;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    cout << lis_length(a) << "\n";
    return 0;
}
