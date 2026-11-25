#include <bits/stdc++.h>
using namespace std;

long long frog_min_energy(const std::vector<long long>& h) {
    int n = (int)h.size();
    if (n == 1) return 0;
    std::vector<long long> dp(n, 0);
    dp[1] = h[1] > h[0] ? h[1] - h[0] : h[0] - h[1];
    for (int i = 2; i < n; i++) {
        long long one = dp[i - 1] + (h[i] > h[i - 1] ? h[i] - h[i - 1] : h[i - 1] - h[i]);
        long long two = dp[i - 2] + (h[i] > h[i - 2] ? h[i] - h[i - 2] : h[i - 2] - h[i]);
        dp[i] = one < two ? one : two;
    }
    return dp[n - 1];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> h(n);
    for (auto& x : h) cin >> x;
    cout << frog_min_energy(h) << "\n";
    return 0;
}
